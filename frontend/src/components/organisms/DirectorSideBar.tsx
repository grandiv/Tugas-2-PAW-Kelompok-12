"use client";
import { useState } from "react";
import { AiOutlineFileAdd, AiOutlineLogout } from "react-icons/ai";
import axios from "axios";

interface DirectorFormData {
  _id: string;
  name: string;
  birthDate: string;
  country: string;
  images: string[];
}

export default function DirectorSideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function AddDirectorModal() {
    const [formData, setFormData] = useState<DirectorFormData>({
      _id: "",
      name: "",
      birthDate: "",
      country: "",
      images: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData: DirectorFormData) => ({
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

    const handleDeleteImage = (index: number) => {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prevData) => ({
        ...prevData,
        images: newImages,
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/api/director/create", {
          _id: formData._id,
          name: formData.name,
          birth: {
            date: formData.birthDate,
            country: formData.country,
          },
          images: formData.images,
        });
        alert("Director added successfully");
        setIsModalOpen(false);
      } catch (error) {
        console.error(
          "Failed to add director:",
          axios.isAxiosError(error) ? error.response?.data : error
        );
        alert(
          `Failed to add director: ${
            axios.isAxiosError(error) ? error.response?.data.message : error
          }`
        );
      }
    };

    return (
      <div className="fixed min-h-screen min-w-full top-0 left-0 w-fit h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Add New Director
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold text-gray-600">ID</label>
              <input
                type="text"
                name="_id"
                value={formData._id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
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
              <label className="text-sm font-semibold text-gray-600">
                Date of Birth
              </label>
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
              <label className="text-sm font-semibold text-gray-600">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Add Image URL
              </label>
              <input
                type="text"
                name="newImage"
                onChange={handleImageChange}  // Input untuk menambah gambar
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Current Images
              </label>
              {formData.images.map((image, index) => (
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
                    onClick={() => handleDeleteImage(index)}  // Tombol untuk menghapus gambar
                    className="px-2 py-1 bg-white text-white rounded hover:bg-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
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
    <div className="p-[24px] pt-[5rem] h-screen justify-between flex flex-col w-fit border-r-[1px]">
      <button onClick={() => setIsModalOpen(true)}>
        <AiOutlineFileAdd className="text-[32px]" />
      </button>
      <AiOutlineLogout className="text-[32px]" />
      {isModalOpen && <AddDirectorModal />}
    </div>
  );
}
