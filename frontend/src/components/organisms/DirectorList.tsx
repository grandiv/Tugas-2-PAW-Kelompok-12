'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

// Define the type for director data
interface Director {
  _id: string;
  name: string;
  country: string;
}

// Component for editing and deleting directors
function DirectorCard({ data }: { data: Director }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle deletion of director
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/director/${data._id}`);
      alert("Director deleted successfully.");
      router.push("/directors"); // Update the page to reflect the deletion
    } catch (error) {
      console.error(
        "Failed to delete director:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Failed to delete director: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  // Modal component for updating director information
  function UpdateDirectorModal() {
    const [formData, setFormData] = useState({
      name: data.name,
      country: data.country,
    });

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    // Handle form submission to update the director
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); // Prevent page reload
      try {
        await axios.patch(`http://localhost:5000/api/director/${data._id}`, {
          name: formData.name,
          country: formData.country,
        });
        alert("Director updated successfully.");
      } catch (error) {
        console.error(
          "Failed to update director:",
          error.response ? error.response.data : error.message
        );
        alert(
          `Failed to update director: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
      setIsModalOpen(false);
      router.push("/directors");
    };

    // Modal UI
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative z-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Edit Director</h2>
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
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <div className="w-full flex justify-between gap-[12px]">
              <h1 className="text-xl font-bold text-gray-900">{data.name}</h1>
              <div className="flex gap-[6px]">
                <button onClick={() => setIsModalOpen(true)}>
                  <AiOutlineEdit />
                </button>
                <button onClick={handleDelete}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
            <h2 className="text-lg text-gray-600">{data.country}</h2>
          </div>
        </div>
      </div>
      {isModalOpen && <UpdateDirectorModal />}
    </>
function DirectorCard({ data }: { data: Director }) {
  return (
    <div className="w-full aspect-[3/4] border">
      <div className="flex flex-col w-full h-full z-10 p-[12px] justify-between">
        <div>
          <h1 className="text-[24px] font-medium">{data.name}</h1>
          <h2>{data.country}</h2>
        </div>
      </div>
    </div>
  );
}

export default function DirectorList() {
  const [directors, setDirectors] = useState<Director[]>([]);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/director/");
        setDirectors(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchDirectors();
  }, []);

  return (
    <section className="p-8 w-full bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">List of Directors:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {directors.map((director) => (
          <DirectorCard key={director._id} data={director} />
        ))}
      </div>
    </section>
  );
}
