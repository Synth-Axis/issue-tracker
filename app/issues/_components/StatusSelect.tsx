"use client";

import { Status, Issue } from "@prisma/client";
import { Select, Badge } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { statusMap } from "./statusMap";

export default function StatusSelect({ issue }: { issue: Issue }) {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (newStatus: Status) => {
    try {
      setLoading(true);
      await axios.patch(`/api/issues/${issue.id}`, { status: newStatus });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select.Root
      defaultValue={issue.status}
      onValueChange={(value) => changeStatus(value as Status)}
    >
      <Select.Trigger className="cursor-pointer w-[140px]" />

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
