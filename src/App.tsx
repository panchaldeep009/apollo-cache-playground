import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/components/UserSelector";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTab from "./UserTab";

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
        <UserTab user={user} onUserSelect={setUser} />
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
