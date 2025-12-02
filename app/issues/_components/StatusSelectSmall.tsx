"use client";

import { Status, Issue } from "@prisma/client";
import { Select, Badge } from "@radix-ui/themes";
import axios from "axios";
import toast from "react-hot-toast";
import { statusMap } from "./statusMap";

export default function StatusSelectSmall({ issue }: { issue: Issue }) {
  const changeStatus = async (newStatus: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, { status: newStatus });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <Select.Root
      defaultValue={issue.status}
      onValueChange={(value) => changeStatus(value as Status)}
    >
      <Select.Trigger className="cursor-pointer w-[140px] text-sm" />

      <Select.Content>
        {Object.entries(statusMap).map(([key, { label, color }]) => (
          <Select.Item key={key} value={key}>
            <Badge color={color} radius="full">
              {label}
            </Badge>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
