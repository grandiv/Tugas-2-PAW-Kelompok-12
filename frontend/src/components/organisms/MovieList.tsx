"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
// Define the type for a movie object
interface Movie {
  _id: string;
  description: string;
  title: string;
  genre: string[];
  release_date?: string; // Optional property
}

function MovieCard({ data }: { data: Movie }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/movie/${data._id}`);
      alert("Delete movie success");
      router.push("/movies");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to delete movie:",
          error.response ? error.response.data : error.message
        );
        alert(
          `Failed to delete movie: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      } else {
        console.error("Failed to delete movie:", error);
        alert(`Failed to delete movie: ${error}`);
      }
    }
  };

  function UpdateMovieModal() {
    const [formData, setFormData] = useState({
      title: data.title,
      desc: data.description,
      release_date: data.release_date ? data.release_date.split("T")[0] : "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent page reload
      try {
        await axios.patch(`http://localhost:5000/api/movie/${data._id}`, {
          title: formData.title,
          description: formData.desc,
          release_date: formData.release_date,
        });
        alert("Edit Success");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Failed to delete movie:",
            error.response ? error.response.data : error.message
          );
          alert(
            `Failed to delete movie: ${
              error.response ? error.response.data.message : error.message
            }`
          );
        } else {
          console.error("Failed to delete movie:", error);
          alert(`Failed to delete movie: ${error}`);
        }
      }
      setIsModalOpen(false);
      router.push("/movies");
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative z-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Edit Movie
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Description
              </label>
              <input
                type="text"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Release Date
              </label>
              <input
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <div className="w-full flex justify-between gap-[12px]">
              <h1 className="text-xl font-bold text-gray-900">{data.title}</h1>
              <div className="flex gap-[6px]">
                <button onClick={() => setIsModalOpen(true)}>
                  <AiOutlineEdit />
                </button>
                <button onClick={handleDelete}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
            <h2 className="text-lg text-gray-600">{data.genre[0]}</h2>
            <p className="text-sm text-gray-500 mt-2">
              {data.release_date
                ? `Release Date: ${data.release_date.split("T")[0]}`
                : "Release Date Unknown"}
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && <UpdateMovieModal />}
    </>
  );
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movie/");
        setMovies(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchMovies();
  }, []);

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
