import MovieList from "@/components/organisms/MovieList";

export default function MoviesPage() {
  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold mb-6">Movies</h1>
      {/* Reuse the MovieList component */}
      <MovieList />
    </main>
  );
}
