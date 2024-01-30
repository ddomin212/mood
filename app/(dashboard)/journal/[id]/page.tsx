import Editor from "@/components/Editor";
import { prisma } from "@/prisma/connector";
import { getUserByClerkId } from "@/prisma/getUser";
import React from "react";

const getEntry = async (id) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUniqueOrThrow({
    where: {
      userId_id: {
        userId: user.id as string,
        id: id,
      },
    },
    include: {
      analysis: true,
    },
  });
  return entry;
};

async function EntryPage({ params }) {
  const entry = await getEntry(params.id);
  const { mood, summary, color, negative, sentimentScore, subject } =
    entry?.analysis;
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div
        className="border-l border-black/10"
        style={{ backgroundColor: color.toString() }}
      >
        <div className="p-8 text-sm">
          <ul className="list-none">
            <li className="pb-2">
              <span className="font-bold">Mood:</span> {mood}
            </li>
            <li className="pb-2">
              <span className="font-bold">Summary:</span> {summary}
            </li>
            <li className="pb-2">
              <span className="font-bold">Negative:</span> {negative.toString()}
            </li>
            <li className="pb-2">
              <span className="font-bold">Sentiment Score:</span>{" "}
              {sentimentScore}
            </li>
            <li className="pb-2">
              <span className="font-bold">Subject:</span> {subject}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EntryPage;
