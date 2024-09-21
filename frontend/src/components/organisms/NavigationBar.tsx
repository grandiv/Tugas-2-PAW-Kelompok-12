import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
export default function NavigationBar(){
    return(
        <nav className="w-full px-[48px] py-[20px] flex justify-between items-center border-b-[1px] drop-shadow-sm">
            <h1 className="text-[32px] font-black">MovieDB</h1>
            <div className="text-[24px] h-full flex items-center gap-[12px]">
                <Link href={'/m'}>Movies</Link>
                <Link href={'/actors'}>Actors</Link>
                <Link href={'/directors'}>Directors</Link>
            </div>
            <div className="h-full flex items-center text-[32px]">
                <AiOutlineUser className=""/>
            </div>
        </nav>
    )
}