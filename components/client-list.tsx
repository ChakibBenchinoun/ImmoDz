"use client";
import { useQuery } from "@tanstack/react-query";
import type { Client } from "@/utils/schema/client";

async function fetchClients() {
  const res = await fetch("/api/clients");
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json() as Promise<Client[]>;
}

export default function ClientList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl">Clients</h2>
      <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {data?.map((client) => (

          <li key={client.client_id} className="mb-2 tracking-[-.01em]">
            {client.name} - {client.email}
          </li>
        ))}
      </ol>
    </div>
  );
}
