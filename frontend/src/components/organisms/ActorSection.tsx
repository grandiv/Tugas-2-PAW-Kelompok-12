"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

function ActorCard({ data }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/actor/${data._id}`
      );
      alert(response.data.message);
      router.push("/actors");
    } catch (error) {
      console.error(
        "Failed to delete actor:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Failed to delete actor: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  function UpdateActorModal() {
    const [formData, setFormData] = useState({
      name: data.name,
      desc: data.desc,
      birthDate: data.birth.date.split("T")[0],
      country: data.birth.country,
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page reload
      try {
        const response = await axios.put(
          `http://localhost:5000/api/actor/${data._id}`,
          {
            name: formData.name,
            desc: formData.desc,
            birth: {
              date: formData.birthDate,
              country: formData.country,
            },
          }
        );
        alert("Edit Success");
      } catch (error) {
        console.error(
          "Failed to edit actor:",
          error.response ? error.response.data : error.message
        );
        alert(
          `Failed to edit actor: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
      setIsModalOpen(false);
      router.push("/actors");
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Edit Actor Details
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Description</label>
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
              <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
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
      <div className="w-full aspect-[3/4] border shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col w-full h-full p-4 justify-between">
          <div className="w-full flex justify-end gap-4">
            <button onClick={() => setIsModalOpen(true)}>
              <AiOutlineEdit className="text-[24px] text-white" />
            </button>
            <button onClick={handleDelete}>
              <AiOutlineClose className="text-[24px] text-white" />
            </button>
          </div>
          <div>
            <h1 className="text-[24px] font-medium text-gray-800">{data.name}</h1>
            <h2 className="text-sm text-gray-500">{data.birth.country}</h2>
          </div>
        </div>
      </div>
      {isModalOpen && <UpdateActorModal />}
    </>
  );
}

export default function ActorSection() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/actor/");
        setActors(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchActors();
  }, []);

  return (
    <section className="p-6 w-full">
      <h1 className="text-4xl font-bold mb-6">List of Actors :</h1>
      <div className="grid grid-cols-4 gap-6">
        {actors.map((actor) => (
          <ActorCard key={actor._id} data={actor} />
        ))}
      </div>
    </section>
  );
}
