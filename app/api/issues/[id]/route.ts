import { issueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// PATCH: update an issue
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issueId = parseInt(context.params.id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ message: "Invalid issue" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(
    { message: "Issue updated", issue: updatedIssue },
    { status: 200 }
  );
}

// DELETE: delete an issue
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const issueId = parseInt(context.params.id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ message: "Invalid issue" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({}, { status: 204 });
}
