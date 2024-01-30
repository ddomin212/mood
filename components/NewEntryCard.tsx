"use client";

import { useRouter } from "next/navigation";

import { createNewEntry } from "@/app/api/_utils/api";
import Link from "next/link";

function NewEntryCard() {
  const router = useRouter();
  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white/10 shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-2xl">📝 New Entry</span>
      </div>
    </div>
  );
}

export default NewEntryCard;
