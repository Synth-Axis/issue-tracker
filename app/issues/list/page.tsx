"use client";

import { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "../../components";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { IssueStatus } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Issue {
  id: number;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
}

interface Props {
  searchParams: {
    status?: IssueStatus;
    orderBy?: keyof Issue;
    order?: "asc" | "desc";
  };
}

const IssuesPage = ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("/api/issues", { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text();
          console.error("Erro na resposta:", text);
          return;
        }

        const data = await res.json();
        setIssues(data);
      } catch (error) {
        console.error("Erro ao obter issues:", error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isActive = column.value === searchParams.orderBy;

              const nextOrder =
                isActive && searchParams.order === "asc" ? "desc" : "asc";

              return (
                <Table.ColumnHeaderCell key={column.value}>
                  <NextLink
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        order: nextOrder,
                      },
                    }}
                  >
                    {column.label}
                  </NextLink>

                  {isActive && (
                    <>
                      {searchParams.order === "asc" ? (
                        <ArrowUpIcon className="inline-block ml-1" />
                      ) : (
                        <ArrowUpIcon className="inline-block ml-1 rotate-180" />
                      )}
                    </>
                  )}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden"></div>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                {new Date(issue.createdAt).toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
