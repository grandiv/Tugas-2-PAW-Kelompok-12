import NavigationBar from "@/components/organisms/NavigationBar";
import { AiOutlineUser } from "react-icons/ai";

export default function ProfilePage() {
  return (
    <div>
      <NavigationBar />
      <main className="bg-white text-black min-w-full min-h-screen p-[24px] flex justify-center items-center">
        <div className="p-[24px] border w-[300px] text-center">
          <AiOutlineUser className="text-[64px] mb-[16px]" />
          <h1 className="text-[24px] font-bold">John Doe</h1>
          <p>Email: johndoe@example.com</p>
          <button className="mt-[16px] bg-blue-500 text-white px-[16px] py-[8px]">
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
}
