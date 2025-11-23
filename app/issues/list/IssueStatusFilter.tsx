"use client";
import { IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: IssueStatus | string }[] = [
  { label: "All", value: "all" }, // Set a unique value for "All"
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by Status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item
            key={status.value || `status-${index}`}
            value={status.value || "all"} // Set a non-empty value for the "All" option
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
