import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="z-50 w-full px-8 py-4 bg-gray-900 text-white fixed top-0 left-0 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold tracking-wide">
        <Link href="/">MovieDB</Link>
      </h1>
      <div className="flex items-center space-x-8 text-lg">
        <Link
          href="/movies"
          className="hover:text-gray-300 transition duration-300"
        >
          Movies
        </Link>
        <Link
          href="/actors"
          className="hover:text-gray-300 transition duration-300"
        >
          Actors
        </Link>
        <Link
          href="/directors"
          className="hover:text-gray-300 transition duration-300"
        >
          Directors
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <button className="hover:bg-gray-700 text-sm font-semibold py-1 px-4 rounded-lg bg-blue-500">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="hover:bg-gray-700 text-sm font-semibold py-1 px-4 rounded-lg bg-green-500">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}
