import { useState } from "react";
import { User } from "@/components/UserSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { AddUserDocument } from "@/codegen";

interface EditUserProps {
  user: User | null;
}

export function EditUser({ user }: EditUserProps) {
  const [name, setName] = useState(user?.name ?? "");

  const [updateUser] = useMutation(AddUserDocument);

  const handleAddUser = () => {
    if (!user) return;

    updateUser({
      variables: {
        input: {
          id: user.id,
          name,
        },
      },
      optimisticResponse: {
        insert_user_one: {
          __typename: "user",
          id: user.id,
          name,
        },
      },
    });
  };

  return (
    <div className="flex items-end gap-2 w-full">
      <label>
        <p>Edit User</p>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={!user ? "No User selected" : "User Name"}
          disabled={!user}
          className="w-full"
        />
      </label>
      <Button onClick={handleAddUser} disabled={!user}>
        Update User
      </Button>
    </div>
  );
}
