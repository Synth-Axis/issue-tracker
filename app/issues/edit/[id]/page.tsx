import IssueForm from "@/app/issues/_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface EditIssuePageProps {
  params: { id: string };
}

export default async function EditIssuePage({ params }: EditIssuePageProps) {
  const { id } = params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
