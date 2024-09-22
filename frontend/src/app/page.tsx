import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center p-8" style={{ backgroundImage: "url('/assets/background.jpg')" }}>
      <h1 className="text-5xl font-bold text-white mb-8">
        Welcome to MovieDB
      </h1>
      <div className="flex space-x-4">
        <Link href="/login">
          <button className="text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="text-lg font-semibold bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg">
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
