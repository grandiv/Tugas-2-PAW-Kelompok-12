"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { Movie, MovieFormData, ApiResponseMovie } from "@/app/types/movie";
import Image from "next/image";
import Select, { MultiValue, SingleValue } from "react-select";
import { Actor, ApiResponseActor } from "@/app/types/actor";
import { Director, ApiResponseDirector } from "@/app/types/director";

interface MovieCardProps {
  data: Movie;
}

interface SelectOption {
  value: string;
  label: string;
}

function MovieCard({ data }: MovieCardProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [actors, setActors] = useState<SelectOption[]>([]);
  const [directors, setDirectors] = useState<SelectOption[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActorsAndDirectors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const timestamp = Date.now();
        const [actorsResponse, directorsResponse] = await Promise.all([
          axios.get<ApiResponseActor<Actor[]>>(
            `http://localhost:5000/api/actor?t=${timestamp}`
          ),
          axios.get<ApiResponseDirector<Director[]>>(
            `http://localhost:5000/api/director?t=${timestamp}`
          ),
        ]);
        console.log("Actors response:", actorsResponse.data);
        console.log("Directors response:", directorsResponse.data);
        if (
          actorsResponse.data &&
          Object.keys(actorsResponse.data).length > 0
        ) {
          const actorsArray = Object.values(actorsResponse.data).filter(
            (actor) => typeof actor === "object" && actor !== null
          );
          setActors(
            actorsArray.map((actor: Actor) => ({
              value: actor._id,
              label: actor.name,
            }))
          );
        } else {
          console.warn(
            "No actors data received or empty object",
            actorsResponse.data
          );
        }

        if (
          directorsResponse.data &&
          Object.keys(actorsResponse.data).length > 0
        ) {
          const directorsArray = Object.values(directorsResponse.data).filter(
            (director) => typeof director === "object" && director !== null
          );
          setDirectors(
            directorsArray.map((director: Director) => ({
              value: director._id,
              label: director.name,
            }))
          );
        } else {
          console.warn(
            "No directors data received or empty array",
            directorsResponse.data
          );
        }
      } catch (error) {
        console.error("Failed to fetch actors and directors:", error);
        setError("Failed to load actors and directors. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActorsAndDirectors();
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    description: "",
    genre: [],
    category: "",
    release_date: "",
    actors: [],
    images: [],
    awards: {
      win: [],
      nomination: [],
    },
    directors: [],
  });

  const handleActorChange = (newValue: MultiValue<SelectOption>) => {
    setFormData((prevData) => ({
      ...prevData,
      actors: newValue.map((option) => option.value),
    }));
  };

  const handleDirectorChange = (newValue: SingleValue<SelectOption>) => {
    setFormData((prevData) => ({
      ...prevData,
      directors: newValue ? [newValue.value] : [],
    }));
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const response = await axios.delete<ApiResponseMovie<Movie>>(
          `http://localhost:5000/api/movie/${data._id}`
        );
        alert(response.data.message);
        router.push("/movies");
      } catch (error) {
        console.error(
          "Failed to delete movie:",
          axios.isAxiosError(error) ? error.response?.data : error
        );
        alert(
          `Failed to delete movie: ${
            axios.isAxiosError(error) ? error.response?.data.message : error
          }`
        );
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
    );
  };

  function UpdateMovieModal() {
    const [formData, setFormData] = useState<MovieFormData>({
      title: data.title,
      description: data.description,
      genre: data.genre,
      category: data.category,
      release_date: data.release_date,
      actors: data.actors,
      images: data.images,
      awards: {
        win: data.awards.win,
        nomination: data.awards.nomination,
      },
      directors: data.directors,
    });

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prevData: MovieFormData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, value],
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios.patch<ApiResponseMovie<Movie>>(
          `http://localhost:5000/api/movie/${data._id}`,
          {
            title: formData.title,
            description: formData.description,
            genre: formData.genre,
            category: formData.category,
            release_date: formData.release_date,
            actors: formData.actors,
            images: formData.images,
            awards: {
              win: formData.awards.win,
              nomination: formData.awards.nomination,
            },
            directors: formData.directors,
          }
        );
        alert("Edit Success");
      } catch (error) {
        console.error(
          "Failed to edit movie:",
          axios.isAxiosError(error) ? error.response?.data : error
        );
        alert(
          `Failed to edit movie: ${
            axios.isAxiosError(error) ? error.response?.data.message : error
          }`
        );
      }
      setIsModalOpen(false);
      router.push("/movies");
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg w-1/3 relative">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Edit Movie Details
          </h2>
          {isLoading ? (
            <p>Loading actors and directors...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
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
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
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
                  name="releaseDate"
                  value={formData.release_date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              {/* Actors */}
              <div>
                <label
                  htmlFor="actors"
                  className="block text-sm font-medium text-gray-700"
                >
                  Actors
                </label>
                <Select
                  isMulti
                  id="actors"
                  name="actors"
                  options={actors}
                  className="mt-1"
                  classNamePrefix="select"
                  onChange={handleActorChange}
                />
                {actors.length === 0 && (
                  <p className="text-yellow-500 mt-1">No actors available</p>
                )}
              </div>

              {/* Directors */}
              <div>
                <label
                  htmlFor="directors"
                  className="block text-sm font-medium text-gray-700"
                >
                  Directors
                </label>
                <Select
                  id="directors"
                  name="directors"
                  options={directors}
                  className="mt-1"
                  classNamePrefix="select"
                  onChange={handleDirectorChange}
                />
                {directors.length === 0 && (
                  <p className="text-yellow-500 mt-1">No directors available</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Add Image URL
                </label>
                <input
                  type="text"
                  name="newImage"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Current Images
                </label>
                {formData.images.map((image: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[index] = e.target.value;
                        setFormData((prevData) => ({
                          ...prevData,
                          images: newImages,
                        }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = formData.images.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prevData) => ({
                          ...prevData,
                          images: newImages,
                        }));
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Awards
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.awards.win}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={formData.awards.nomination}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[red] hover:bg-gray-300 hover:text-[red] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-gray-300 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full aspect-[3/4] border shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col w-full h-full p-4 justify-between">
          <div className="w-full flex justify-end gap-4 mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:bg-green-400"
            >
              <AiOutlineEdit className="text-[24px] text-white" />
            </button>
            <button onClick={handleDelete} className="hover:bg-[red]">
              <AiOutlineClose className="text-[24px] text-white" />
            </button>
          </div>
          <div className="relative w-full h-3/4">
            {data.images.length > 0 ? (
              <>
                <Image
                  src={data.images[currentImageIndex]}
                  alt={data.title}
                  className="w-full h-full object-cover"
                  fill
                />
                {data.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    >
                      <AiOutlineLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    >
                      <AiOutlineRight />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                No Image Available
              </div>
            )}
          </div>
          <div>
            <h1 className="text-[24px] font-medium text-gray-800">
              {data.title}
            </h1>
            <h2 className="text-sm text-gray-500">{data.genre.join(", ")}</h2>
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
        const response = await axios.get<Movie[]>(
          "http://localhost:5000/api/movie/"
        );
        setMovies(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="p-6 w-full">
      <h1 className="text-4xl font-bold mb-6">List of Movies :</h1>
      <div className="grid grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} data={movie} />
        ))}
      </div>
    </section>
  );
}
