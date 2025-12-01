import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction={"column"} gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Track, filter, and manage issues in real-time.",
  openGraph: {
    title: "Issue Tracker Dashboard",
    description: "Track, filter, and manage issues in real-time.",
    url: "https://your-domain.com",
    siteName: "Issue Tracker",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Issue Tracker Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Issue Tracker Dashboard",
    description: "Track, filter, and manage issues in real-time.",
    images: ["https://your-domain.com/og-image.png"],
  },
};

export const dynamic = "force-dynamic";
