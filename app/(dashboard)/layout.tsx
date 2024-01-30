import { UserButton } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Link from "next/link";
import React from "react";

const links = [
  { name: "Journals", href: "/journal" },
  { name: "History", href: "/history" },
];

function DashLayout({ children }) {
  return (
    <div className="h-screen w-screen relative">
      <div className="w-[200px] absolute top-0 left-0 h-full border-r border-white">
        <div className="flex items-center justify-center pt-4 text-lg">
          📓 The Journal
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ml-[200px]">
        <header className="h-[60px] border-b border-white">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton appearance={neobrutalism} />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashLayout;
