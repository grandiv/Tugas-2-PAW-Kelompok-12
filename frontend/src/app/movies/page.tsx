import AuthLayout from "@/components/organisms/AuthLayout";
import MovieList from "@/components/organisms/MovieList";
import MovieSideBar from "@/components/organisms/MovieSideBar";

export default function MoviesPage() {
  return (
    <AuthLayout>
      <main className="min-h-screen bg-white flex">
        {/* Reuse the MovieList component */}
        <MovieSideBar />
        <MovieList />
      </main>
    </AuthLayout>
  );
}
