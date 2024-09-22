'use client';
import { useState, useEffect } from "react";

// Define the type for a movie object
interface Movie {
  _id: string;
  title: string;
  genre: string;
  release_date?: string; // Optional property
}

function MovieCard({ data }: { data: Movie }) {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{data.title}</h1>
          <h2 className="text-lg text-gray-600">{data.genre}</h2>
          <p className="text-sm text-gray-500 mt-2">
            {data.release_date ? `Release Date: ${data.release_date}` : 'Release Date Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([
    { _id: '1', title: 'Inception', genre: 'Sci-Fi', release_date: '2010-07-16' },
    { _id: '2', title: 'The Dark Knight', genre: 'Action', release_date: '2008-07-18' },
    { _id: '3', title: 'Interstellar', genre: 'Sci-Fi', release_date: '2014-11-07' },
    { _id: '4', title: 'The Prestige', genre: 'Drama', release_date: '2006-10-20' },
    { _id: '5', title: 'Memento', genre: 'Thriller', release_date: '2000-10-11' },
    { _id: '6', title: 'Dunkirk', genre: 'War', release_date: '2017-07-21' },
    { _id: '7', title: 'Tenet', genre: 'Action', release_date: '2020-08-26' },
    { _id: '8', title: 'Batman Begins', genre: 'Action', release_date: '2005-06-15' },
  ]);

  return (
    <section className="p-8 w-full bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">List of Movies:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie._id} data={movie} />
        ))}
      </div>
    </section>
  );
}
