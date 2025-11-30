import Pagination from "@/app/components/Pagination";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { prisma } from "@/prisma/client";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: Promise<IssueQuery>;
}) => {
  const resolved = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(resolved.status)
    ? resolved.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(resolved.orderBy)
    ? { [resolved.orderBy]: "asc" }
    : undefined;

  const page = parseInt(resolved.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={resolved} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "All Issues",
  openGraph: {
    title: "Issue Tracker - Issue List",
    description: "View All project Issues.",
    url: "https://your-domain.com",
    siteName: "Issue Tracker",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Issue Tracker - Issue List",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Issue Tracker - Issue List",
    description: "View All project Issues.",
    images: ["https://your-domain.com/og-image.png"],
  },
};

export default IssuesPage;
