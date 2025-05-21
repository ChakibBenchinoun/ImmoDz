import ClientList from "@/components/client-list";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ClientList />
    </div>
  );
}
