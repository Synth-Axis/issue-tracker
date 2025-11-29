import { Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "../../components";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { IssueStatus, Issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { prisma } from "@/prisma/client";

interface Props {
  searchParams: {
    status?: IssueStatus;
    orderBy?: keyof Issue;
    order?: "asc" | "desc";
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const orderBy = searchParams.orderBy ?? "createdAt";
  const order = searchParams.order ?? "asc";

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const issues = await prisma.issue.findMany({
    where: searchParams.status ? { status: searchParams.status } : {},
    orderBy: {
      [orderBy]: order,
    },
  });

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isActive = column.value === orderBy;
              const nextOrder = isActive && order === "asc" ? "desc" : "asc";

              return (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
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
                      {order === "asc" ? (
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
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
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
