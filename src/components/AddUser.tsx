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
      if (!data.insert_user_one) return;
      onAddUser(data.insert_user_one);
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
          __typename: "user",
          id: Math.random(),
          name,
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
