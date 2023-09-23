import { AllUsersDocument, AllUsersQuery } from "@/codegen";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@apollo/client";

export type User = AllUsersQuery["user"][number];

interface UserSelectorProps {
  selectedUser: User | null;
  onUserSelect: (user: User | null) => void;
}

export function UserSelector({
  selectedUser,
  onUserSelect,
}: UserSelectorProps) {
  const { data } = useQuery<AllUsersQuery>(AllUsersDocument);

  return (
    <label>
      <span>Select User :</span>
      <Select
        value={selectedUser?.id.toString()}
        onValueChange={(value) =>
          onUserSelect(
            data?.user.find((user) => user.id.toString() === value) ?? null
          )
        }
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Users" />
        </SelectTrigger>
        <SelectContent>
          {data?.user.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
