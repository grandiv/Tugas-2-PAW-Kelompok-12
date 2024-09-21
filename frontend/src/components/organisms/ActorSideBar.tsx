import { AiOutlineFileAdd } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
export default function ActorSideBar(){
    return(
        <div className="p-[24px] h-screen justify-between flex flex-col w-fit border-r-[1px]">
            <AiOutlineFileAdd className="text-[32px]"/>
            <AiOutlineLogout className="text-[32px]"/>
        </div>
    )
}