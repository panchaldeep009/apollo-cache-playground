import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, UserSelector } from "@/components/UserSelector";
import { AddUser } from "@/components/AddUser";
import { EditUser } from "@/components/EditUser";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { UserFragmentDoc } from "./codegen";
import { DeleteUser } from "./components/DeleteUser";

interface UserTabProps {
  user: User | null;
  onUserSelect: (user: User | null) => void;
}

function UserTab({ user, onUserSelect }: UserTabProps) {
  const { cache } = useApolloClient();

  useEffect(() => {
    if (!user) return;

    return cache.watch({
      callback: (data) => {
        console.log("data", data.result);
      },
      query: cache["getFragmentDoc"](UserFragmentDoc),
      id: cache.identify({ __typename: "user", id: user?.id }),
      optimistic: true,
      immediate: true,
    });
  }, [cache, user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Users for todo list</CardDescription>
      </CardHeader>
      <CardContent className="w-[480px]">
        <div className="flex flex-col gap-4 w-full">
          <UserSelector selectedUser={user} onUserSelect={onUserSelect} />
          <AddUser onAddUser={onUserSelect} />
          <EditUser user={user} key={user?.id} />
          <DeleteUser
            userId={user?.id}
            onUserDelete={() => onUserSelect(null)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default UserTab;
