import ActorSection from "@/components/organisms/ActorSection";
import ActorSideBar from "@/components/organisms/ActorSideBar";
import AuthLayout from "@/components/organisms/AuthLayout";

export default function ActorPage() {
  return (
    <AuthLayout>
      <main className="bg-white text-black min-w-full min-h-screen flex">
        <ActorSideBar />
        <ActorSection />
      </main>
    </AuthLayout>
  );
}
