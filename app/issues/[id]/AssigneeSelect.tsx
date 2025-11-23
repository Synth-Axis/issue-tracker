"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignIssue = async (userId: string) => {
    const updatedUserId = userId === "-" ? null : userId;
    await axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: updatedUserId,
      })
      .catch((err) => {
        toast.error("Changes could not be saved");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "-"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Sugestions</Select.Label>
            <Select.Item value="-">Unasigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () =>
      axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });

export default AssigneeSelect;
