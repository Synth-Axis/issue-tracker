"use client";

import { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";
import Link from "../components/Link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./IssueActions";

interface Issue {
  id: number;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("/api/issues", { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text(); // para debugging
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
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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

export default IssuesPage;
