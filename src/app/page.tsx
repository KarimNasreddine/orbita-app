import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        className={`${montserrat.className} font-bold bg-indigo-500 p-8 rounded-2xl text-white text-4xl text-center`}
        href="/dashboard"
      >
        <p>Click Here</p>
        <p className="text-sm mt-8">
          (Temporary until middleware implementation)
        </p>
      </Link>
    </div>
  );
}
