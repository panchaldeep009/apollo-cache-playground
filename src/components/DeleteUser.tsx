import { DeleteUserDocument } from "@/codegen";
import { Reference, useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";

interface DeleteUserProps {
  userId?: number;
  onUserDelete?: () => void;
}

export const DeleteUser: React.FC<DeleteUserProps> = ({
  userId,
  onUserDelete,
}) => {
  const [deleteUser] = useMutation(DeleteUserDocument);

  const handleDeleteUser = () => {
    if (!userId) return;
    onUserDelete?.();

    deleteUser({
      variables: {
        userId,
      },
      optimisticResponse: {
        delete_user_by_pk: {
          __typename: "user",
          id: userId,
          name: "",
        },
      },

      update(cache) {
        cache.modify({
          id: cache.identify({ __typename: "ROOT_QUERY" }),
          fields: {
            user(existingUsers, { readField }) {
              console.log("existingUsers", existingUsers);
              return existingUsers.filter(
                (userRef: Reference) => userId !== readField("id", userRef)
              );
            },
          },
        });
      },
    });
  };

  return (
    <Button onClick={handleDeleteUser} disabled={!userId} className="accent">
      Delete User
    </Button>
  );
};
