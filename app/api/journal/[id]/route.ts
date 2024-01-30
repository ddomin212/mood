import { prisma } from "@/prisma/connector";
import { getUserByClerkId } from "@/prisma/getUser";
import { NextResponse } from "next/server";
import { analyzeEntry } from "../../_utils/ai";
import { revalidatePath } from "next/cache";

export const PATCH = async (request, { params }) => {
  const user = await getUserByClerkId();
  const json = await request.json();
  const entry = await prisma.journalEntry.update({
    where: {
      id: params.id,
    },
    data: {
      content: json.content,
    },
  });

  // const analysis = await analyzeEntry(entry);
  // await prisma.analysis.upsert({
  //   where: {
  //     entryId: params.id,
  //   },
  //   create: {
  //     entryId: params.id,
  //     ...analysis,
  //   },
  //   update: {
  //     ...analysis,
  //   },
  // });

  revalidatePath(`/journal/${params.id}`);

  return NextResponse.json({
    data: entry,
  });
};
