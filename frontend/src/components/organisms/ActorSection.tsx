'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";

// Actor type definition
interface Actor {
  _id: string;
  name: string;
  birth?: {
    country?: string;
  };
}

function ActorCard({ data }: { data: Actor }) {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-end">
          <AiOutlineMore className="text-gray-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
          <h2 className="text-lg text-gray-600">{data.birth?.country || 'Unknown Country'}</h2>
        </div>
      </div>
    </div>
  );
}

export default function ActorSection() {
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/actor/");
        setActors(response.data);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };

    fetchActors();
  }, []);

  return (
    <section className="p-8 w-full bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">List of Actors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {actors.map((actor) => (
          <ActorCard key={actor._id} data={actor} />
        ))}
      </div>
    </section>
  );
}
