import { useState } from "react";
import { User } from "@/components/UserSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { AddUserDocument } from "@/codegen";

interface AddUserProps {
  onAddUser: (user: User) => void;
}

export function AddUser({ onAddUser }: AddUserProps) {
  const [name, setName] = useState("");

  const [addUser] = useMutation(AddUserDocument, {
    onCompleted: (data) => {
      onAddUser(data.addUser);
      setName("");
    },
  });

  const handleAddUser = () => {
    addUser({
      variables: {
        input: {
          name,
        },
      },
      optimisticResponse: {
        insert_user_one: {
          id: Math.random().toString(),
          name,
          __typename: "User",
        },
      },
    });
  };

  return (
    <div className="flex items-end gap-2 w-full">
      <label>
        <p>Add New User</p>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="User Name"
          className="w-full"
        />
      </label>
      <Button onClick={handleAddUser}>Add User</Button>
    </div>
  );
}
