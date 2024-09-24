'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import DirectorSideBar from "./DirectorSideBar";
import Image from "next/image";

interface Director {
  _id: string;
  name: string;
  country: string;
}

export default function DirectorListWithSidebar() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/director/");
        setDirectors(response.data);
      } catch (error) {
        console.error("Error fetching directors:", error.response || error.message);
      }
    };

    fetchDirectors();
  }, []);

  const handleEdit = (director: Director) => {
    setSelectedDirector(director);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/director/${id}`);
      setDirectors(directors.filter(director => director._id !== id));
    } catch (error) {
      console.error("Error deleting director:", error);
    }
  };

  const handleUpdate = (updatedDirector: Director) => {
    setDirectors((prevDirectors) =>
      prevDirectors.map((director) =>
        director._id === updatedDirector._id ? updatedDirector : director
      )
    );
  };

  function UpdateDirectorModal() {
    const [formData, setFormData] = useState({
      name: selectedDirector?.name || '',
      country: selectedDirector?.country || '',
    });
    
    
    useEffect(() => {
      if (selectedDirector) {
        setFormData({
          name: selectedDirector.name,
          country: selectedDirector.country
        });
      }
    }, [selectedDirector]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/director/${selectedDirector?._id}`,
          formData
        );
        handleUpdate(response.data);  // Update state with the updated director
        alert("Director updated successfully");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating director:", error);
      }
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-semibold">Edit Director</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Director Name"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
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
    <div className="flex w-full">
      <DirectorSideBar />
      <div className="px-8 flex-1 py-[82px]">
        <h1 className="text-2xl font-bold mb-4">List of Directors</h1>
        {directors.length === 0 ? (
          <p>No directors found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {directors.map((director) => (
              <DirectorCard key={director._id} data={director} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && <UpdateDirectorModal />}
    </div>
  );
}

function DirectorCard({ data, onEdit, onDelete }: { data: Director; onEdit: (director: Director) => void; onDelete: (id: string) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div className="w-full aspect-[3/4] border">
      <div className="flex flex-col w-full h-full z-10 p-4 justify-between">
        <div>
          <h1 className="text-lg font-medium">{data.name}</h1>
          <h2>{data.country}</h2>
        </div>
        <div className="relative w-full h-3/4">
            {data.images.length > 0 ? (
              <>
                <Image
                  src={data.images[currentImageIndex]}
                  alt={data.name}
                  className="w-full h-full object-cover"
                  fill
                />
                {/* {data.images.length > 1 && (
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
                )} */}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                No Image Available
              </div>
            )}
          </div>
        <div className="flex gap-4 mt-4">
          <button onClick={() => onEdit(data)} className="text-white">
            <AiOutlineEdit /> {/* Edit Icon */}
          </button>
          <button onClick={() => onDelete(data._id)} className="text-white">
            <AiOutlineClose /> {/* Delete Icon */}
          </button>
        </div>
      </div>
    </div>
  );
}
