import { IssueStatusBadge } from "@/app/components";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Avatar, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";
import { Issue, Prisma, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order?: "asc" | "desc";
  page: string;
  pageSize?: string;
}

type IssueWithUser = Prisma.IssueGetPayload<{
  include: { assignedToUser: true };
}>;

interface Props {
  searchParams: IssueQuery;
  issues: IssueWithUser[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    order:
                      searchParams.orderBy === column.value &&
                      searchParams.order === "asc"
                        ? "desc"
                        : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>

              <div className="inline-block ml-1">
                {/* Ascending arrow */}
                <ArrowUpIcon
                  className={`inline ${
                    searchParams.orderBy === column.value &&
                    searchParams.order === "asc"
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                />

                {/* Descending arrow */}
                <ArrowDownIcon
                  className={`inline ml-1 ${
                    searchParams.orderBy === column.value &&
                    searchParams.order === "desc"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </div>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id} className="hover:font-semibold">
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>

            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>

            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>

            <Table.Cell className="hidden md:table-cell">
              {issue.assignedToUser ? (
                <Avatar
                  src={issue.assignedToUser?.image ?? undefined}
                  fallback={issue.assignedToUser?.name?.[0] ?? "?"}
                  size="2"
                  radius="full"
                />
              ) : (
                <span className="text-gray-400 text-sm">Unassigned</span>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: string;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
  {
    label: "Assigned",
    value: "assignedToUserId",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
