"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Page=()=>{
  return (
    <Suspense fallback={ <LoadingSkeleton/>}>
      <Home/>
    </Suspense>
  )
  
}

function Home() {
  const { username } = useUsername();

  const router = useRouter();

  const searchParams = useSearchParams();
  const wasDestroyed = searchParams.get('destroyed') === 'true';
  const error = searchParams.get('error');

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();
      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">

        {wasDestroyed && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM DESTROYED</p>
            <p className="text-white text-xs mt-1">All messages were permanently deleted</p>

          </div>
        )}
        {error === 'room-not-found' && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM NOT FOUND</p>
            <p className="text-white text-xs mt-1">This room may have expired or never existed</p>

          </div>
        )}
        {error === 'room-full' && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM FILLED</p>
            <p className="text-white text-xs mt-1">This room is at the maximum capacity</p>

          </div>
        )}

        <div className="text-center space-y-2">
          <h1 className="text-2xl tracking-tight text-green-500">
            {">"}private_chat
          </h1>
          <p className="text-zinc-500 text-sm">
            A private self-destructing chat room
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500 ">
                Your Identity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex -1 bg-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>

            <button
              onClick={() => createRoom()}
              className="w-full bg-zinc-100 text-black font-bold text-sm p-3 hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50"
            >
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;