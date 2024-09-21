import ActorSection from "@/components/organisms/ActorSection";
import ActorSideBar from "@/components/organisms/ActorSideBar";

export default function ActorPage() {
    return (
        <main className="bg-white text-black min-w-full min-h-screen flex">
            <ActorSideBar/>
            <ActorSection/>
        </main>
    )
}