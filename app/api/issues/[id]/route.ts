import { issueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest as RequestType } from "next/server";

type RouteContext = {
  params: {
    id: string;
  };
};

// PATCH: update an issue
export async function PATCH(request: RequestType, context: RouteContext) {
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
export async function DELETE(request: RequestType, context: RouteContext) {
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
