import AuthLayout from "@/components/organisms/AuthLayout";
import DirectorList from "@/components/organisms/DirectorList";

export default function DirectorPage() {
  return (
    <AuthLayout>
      <main className="bg-white text-black min-w-full min-h-screen flex justify-between">
        <DirectorList />
      </main>
    </AuthLayout>
  );
}
