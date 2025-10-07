import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";

export default async function EditIssuePage(context: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await context.params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue!} />;
}

function notFound() {
  throw new Error("Function not implemented.");
}
