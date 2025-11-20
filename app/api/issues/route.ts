import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { issueSchema } from "../../validationSchema";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: "OPEN",
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}
