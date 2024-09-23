"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineFileAdd, AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { MovieFormData, ApiResponseMovie } from "@/app/types/movie";
import { Actor, ApiResponseActor } from "@/app/types/actor";
import { Director, ApiResponseDirector } from "@/app/types/director";
import Select, { MultiValue, SingleValue } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

export default function MovieSideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function AddMovieModal() {
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
    const [actors, setActors] = useState<SelectOption[]>([]);
    const [directors, setDirectors] = useState<SelectOption[]>([]);
    const [newImageUrl, setNewImageUrl] = useState("");
    const [genreInput, setGenreInput] = useState("");
    const [newWinAward, setNewWinAward] = useState("");
    const [newNominationAward, setNewNominationAward] = useState("");

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

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

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setGenreInput(value);
      setFormData((prevData) => ({
        ...prevData,
        genre: value.split(",").map((genre) => genre.trim()),
      }));
    };

    const handleAddImage = () => {
      if (newImageUrl.trim()) {
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, newImageUrl.trim()],
        }));
        setNewImageUrl("");
      }
    };

    const handleRemoveImage = (index: number) => {
      setFormData((prevData) => ({
        ...prevData,
        images: prevData.images.filter((_, i) => i !== index),
      }));
    };

    const handleAddWinAward = () => {
      if (newWinAward.trim()) {
        setFormData((prevData) => ({
          ...prevData,
          awards: {
            ...prevData.awards,
            win: [...prevData.awards.win, newWinAward.trim()],
          },
        }));
        setNewWinAward("");
      }
    };

    const handleRemoveWinAward = (index: number) => {
      setFormData((prevData) => ({
        ...prevData,
        awards: {
          ...prevData.awards,
          win: prevData.awards.win.filter((_, i) => i !== index),
        },
      }));
    };

    const handleAddNominationAward = () => {
      if (newNominationAward.trim()) {
        setFormData((prevData) => ({
          ...prevData,
          awards: {
            ...prevData.awards,
            nomination: [
              ...prevData.awards.nomination,
              newNominationAward.trim(),
            ],
          },
        }));
        setNewNominationAward("");
      }
    };

    const handleRemoveNominationAward = (index: number) => {
      setFormData((prevData) => ({
        ...prevData,
        awards: {
          ...prevData.awards,
          nomination: prevData.awards.nomination.filter((_, i) => i !== index),
        },
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios.post<ApiResponseMovie<MovieFormData>>(
          "http://localhost:5000/api/movie/create",
          formData
        );
        alert("Movie added successfully");
        setIsModalOpen(false);
      } catch (error) {
        console.error(
          "Failed to add movie:",
          axios.isAxiosError(error) ? error.response?.data : error
        );
        alert(
          `Failed to add movie: ${
            axios.isAxiosError(error) ? error.response?.data.message : error
          }`
        );
      }
    };

    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center bg-opacity-50 z-50">
        <div className="bg-white max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Add New Movie
          </h2>
          {isLoading ? (
            <p>Loading actors and directors...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Release Date */}
              <div>
                <label
                  htmlFor="release_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Release Date
                </label>
                <input
                  type="date"
                  id="release_date"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Genres */}
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={genreInput}
                  onChange={handleGenreChange}
                  placeholder="e.g. Action, Fiction"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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

              {/* Images */}
              <div>
                <label
                  htmlFor="newImageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Image URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="newImageUrl"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="mt-2 px-4 py-2 bg-green-400 hover:bg-gray-300 rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Display Current Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Images
                </label>
                <div className="mt-1 space-y-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={image}
                        readOnly
                        className="flex-1 rounded-l-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-red-50 text-red-500 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Awards
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Wins
                    </label>
                    <input
                      type="text"
                      id="winAward"
                      value={newWinAward}
                      onChange={(e) => setNewWinAward(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <button
                      type="button"
                      onClick={handleAddWinAward}
                      className="mt-2 px-4 py-2 bg-green-400 hover:bg-gray-300 rounded-md"
                    >
                      Add Win
                    </button>
                    <div className="mt-2 space-y-2">
                      {formData.awards.win.map((win, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={win}
                            readOnly
                            className="flex-1 rounded-l-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveWinAward(index)}
                            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-red-50 text-red-500 hover:bg-red-100"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nominations
                    </label>
                    <input
                      type="text"
                      id="nominationAward"
                      value={newNominationAward}
                      onChange={(e) => setNewNominationAward(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <button
                      type="button"
                      onClick={handleAddNominationAward}
                      className="mt-2 px-4 py-2 bg-green-400 hover:bg-gray-300 rounded-md"
                    >
                      Add Nomination
                    </button>
                    <div className="mt-2 space-y-2">
                      {formData.awards.nomination.map((nomination, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={nomination}
                            readOnly
                            className="flex-1 rounded-l-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNominationAward(index)}
                            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-red-50 text-red-500 hover:bg-red-100"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit and Cancel buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[red] hover:bg-gray-300 hover:text-[red] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
    <div className="p-[24px] pt-[5rem] h-screen justify-between flex flex-col w-fit border-r-[1px]">
      <button onClick={() => setIsModalOpen(true)}>
        <AiOutlineFileAdd className="text-[32px]" />
      </button>
      <AiOutlineLogout className="text-[32px]" />
      {isModalOpen && <AddMovieModal />}
    </div>
  );
}
