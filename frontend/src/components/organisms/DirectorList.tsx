'use client';
import axios from "axios";
import { useEffect, useState } from "react";

// Define the type for director data
interface Director {
  _id: string;
  name: string;
  country: string;
}

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
  // Adding some dummy director data for demonstration purposes
  const [directors, setDirectors] = useState<Director[]>([
    { _id: '1', name: 'Christopher Nolan', country: 'UK' },
    { _id: '2', name: 'Quentin Tarantino', country: 'USA' },
    { _id: '3', name: 'Steven Spielberg', country: 'USA' },
    { _id: '4', name: 'Alfred Hitchcock', country: 'UK' },
    { _id: '5', name: 'Martin Scorsese', country: 'USA' },
    { _id: '6', name: 'Ridley Scott', country: 'UK' },
    { _id: '7', name: 'Stanley Kubrick', country: 'USA' },
    { _id: '8', name: 'James Cameron', country: 'Canada' },
  ]);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/director/");
        setDirectors(response.data); // Set the response data as directors
      } catch (error) {
        console.error("Error fetching directors:", error); // Error handling
      }
    };

    fetchDirectors();
  }, []);

  return (
    <section className="p-[24px] w-full">
      <h1 className="text-[32px] font-bold">List of Directors :</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {directors.map((director) => (
          <DirectorCard key={director._id} data={director} />
        ))}
      </div>
    </section>
  );
}
