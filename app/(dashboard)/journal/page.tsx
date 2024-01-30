import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { prisma } from "@/prisma/connector";
import { getUserByClerkId } from "@/prisma/getUser";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return entries;
};

async function Journal({ children }) {
  const entries = await getEntries();
  return (
    <div className="p-4">
      <h2 className="text-2xl">Entries</h2>
      <Question />
      <div className="grid grid-cols-3 gap-4 pt-5">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Journal;
