"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState} from "react";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);

      alert(response.data.message);
      setFormData({
        username: '',
        password: '',
      });
      Cookies.set('token', response.data.token, {expires: 1/24})
      alert("Login Succes")
      router.push('/movies')
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error login up. Please try again.');
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/image4.jpg')" }}
    >
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full bg-opacity-80 backdrop-filter backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">
              username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handleSubmit}
            
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
  