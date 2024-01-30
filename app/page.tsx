import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();

  let href = userId ? "/journal" : "/sign-in";

  return (
    <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">The Journal</h1>
        <p className="text-2xl text-white/60 mb-4">
          Power is in simplicity, therefore we made it dead simple and minimal,
          yet elegant and powerful 📚.
        </p>
        <div>
          <Link href="/journal">
            <button className="bg-blue-400 p-4 rounded-lg text-xl px-4 py-2">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
