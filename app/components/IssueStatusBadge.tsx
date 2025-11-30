import React from "react";
import { status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: {
    label: "Open",
    color: "red",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "violet",
  },
  CLOSED: {
    label: "Closed",
    color: "green",
  },
};

const IssueStatusBadge = ({ status }: { status: status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
