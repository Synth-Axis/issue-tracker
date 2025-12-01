import IssueForm from "../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function EditIssuePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const resolved = await searchParams;

  const id = resolved.id;
  if (!id) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
