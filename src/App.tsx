import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, UserSelector } from "@/components/UserSelector";
import { AddUser } from "@/components/AddUser";
import { useState } from "react";
import { EditUser } from "@/components/EditUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Tabs defaultValue="users" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="todoList">Todos</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Users for todo list</CardDescription>
          </CardHeader>
          <CardContent className="w-[480px]">
            <div className="flex flex-col gap-4 w-full">
              <UserSelector selectedUser={user} onUserSelect={setUser} />
              <AddUser onAddUser={setUser} />
              <EditUser user={user} key={user?.id} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="todoList">
        <Card>
          <CardHeader>
            <CardTitle>Todo List</CardTitle>
            <CardDescription>This is a todo list</CardDescription>
          </CardHeader>
          <CardContent className="w-[480px]"></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="categories">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Todo list item categories</CardDescription>
          </CardHeader>
          <CardContent className="w-[480px]"></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default App;
