'use client'
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AiOutlineMore } from "react-icons/ai";

function ActorCard({data}){
    return(
        <div className="w-full aspect-[3/4] border">
            <div className="flex flex-col w-full h-full z-10 p-[12px] justify-between">
                <div className="w-full flex justify-end">
                    <AiOutlineMore className="text-[24px]"/>
                </div>
                <div>
                    <h1 className="text-[24px] font-medium">{data.name}</h1>
                    <h2>{data.birth.country}</h2>
                </div>
            </div>
        </div>
    )
}

export default function ActorSection(){
    const [actors, setActors] = useState([])

    useEffect(()=>{
        const fetchActors = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/actor/")
                setActors(response.data)
            } catch (error) {
                alert(error)
            }
        }

        fetchActors();
    }, [])
    return(
        <section className="p-[24px] w-full">
            <h1 className="text-[32px] font-bold">List of Actors :</h1>
            <div className="w-full grid grid-cols-4 justify-between">
                {actors.map((actor) => (
                    <ActorCard key={actor._id} data={actor}/>
                ))}
                
            </div>
        </section>
    )
}