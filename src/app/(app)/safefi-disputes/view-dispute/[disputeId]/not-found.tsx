"use client";

import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className={`${spaceGrotesk.className} text-center`}>
        <h1 className="text-6xl font-bold text-[#6038d1]">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <Link
          className="mt-6 inline-block bg-[#6038d1] text-white px-6 py-3 rounded-lg hover:bg-[#5621e8] transition-all"
          href="/"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
