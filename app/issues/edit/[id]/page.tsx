import IssueForm from "@/app/issues/_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function EditIssuePage({
  params,
}: {
  params: { id: string };
}) {
  const issueId = parseInt(params.id, 10);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
