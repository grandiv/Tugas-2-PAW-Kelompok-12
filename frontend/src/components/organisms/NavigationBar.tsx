import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export default function NavigationBar() {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center bg-gray-900 text-white">
      <h1 className="text-3xl font-extrabold tracking-wide">
        MovieDB
      </h1>
      <div className="flex items-center space-x-8 text-lg">
        <Link href="/movies" className="hover:text-gray-300 transition duration-300">
          Movies
        </Link>
        <Link href="/actors" className="hover:text-gray-300 transition duration-300">
          Actors
        </Link>
        <Link href="/directors" className="hover:text-gray-300 transition duration-300">
          Directors
        </Link>
      </div>
      <div className="flex items-center text-2xl">
        <AiOutlineUser className="hover:text-gray-300 transition duration-300" />
      </div>
    </nav>
  );
}
