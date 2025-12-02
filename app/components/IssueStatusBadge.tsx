import React from "react";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { statusMap } from "@/app/issues/_components/statusMap";

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const info = statusMap[status];
  return <Badge color={info.color}>{info.label}</Badge>;
};

export default IssueStatusBadge;
