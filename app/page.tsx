"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, startTransition } from "react";

const Page = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Home />
    </Suspense>
  );
};

function Home() {
  const { username } = useUsername();
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [disable, setDisable] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const wasDestroyed = searchParams.get("destroyed") === "true";
  const error = searchParams.get("error");

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();
      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      } else {
        throw new Error("Room creation failed");
      }
    },
    onSettled: () => setIsLoading(false),
    onError: () => {
      setIsLoading(false);
      setJoinError("Failed to create room");
    },
  });

  const handleJoin = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setJoinError("Room ID is required");
      return;
    }

    setJoinError(null);
    setLoad(true);
    setDisable(true);

    startTransition(() => {
      try {
        router.push(`/room/${trimmed}`);
      } catch (e) {
        setJoinError("Failed to navigate to room");
        setLoad(false);
        setDisable(false);
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 ">
        {wasDestroyed && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM DESTROYED</p>
            <p className="text-white text-xs mt-1">
              All messages were permanently deleted
            </p>
          </div>
        )}
        {error === "room-not-found" && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM NOT FOUND</p>
            <p className="text-white text-xs mt-1">
              This room may have expired or never existed
            </p>
          </div>
        )}
        {error === "room-full" && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">ROOM FILLED</p>
            <p className="text-white text-xs mt-1">
              This room is at the maximum capacity
            </p>
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

            {isLoading ? (
              <button className="w-full bg-zinc-100 text-black font-bold text-sm p-3 hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50">
                PLEASE WAIT FOR SECONDS...
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoading(true);
                  createRoom();
                }}
                className="w-full bg-zinc-100 text-black font-bold text-sm p-3 hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50"
              >
                CREATE SECURE ROOM
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center ">
          <span>or</span>
        </div>

        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500 ">
                If room already exist
              </label>
              <div className="flex items-center gap-3">
                <div className="flex -1 bg-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {">"} Enter the roomId below
                </div>
              </div>
            </div>

            {load ? (
              <div className="flex gap-2 ">
                <button className="w-full rounded-xl font-bold bg-zinc-50 border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-black text-center py-3 pl-4 pr-4 text-md">
                  {joinError ?? error ?? "PLEASE WAIT FOR A WHILE..."}
                </button>

                <button
                  onClick={handleJoin}
                  className="w-16  rounded-2xl bg-zinc-100 text-black font-bold text-sm p-3 hover:bg-zinc-50 hover:text-black transition-colors cursor-pointer disabled:opacity-50"
                >
                  {error ? "❌" : <Loader2 className="h-6 w-6 animate-spin" />}
                </button>
              </div>
            ) : (
              <div className="flex gap-2 ">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="> Enter the roomID "
                  type="text"
                  className="w-full rounded-xl font-bold bg-zinc-50 border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-black placeholder:text-zinc-700 placeholder:text-center py-3 pl-4 pr-4  text-md"
                />

                <button
                  disabled={disable}
                  onClick={handleJoin}
                  className="w-16  rounded-2xl bg-zinc-100 text-black font-bold text-sm p-3 hover:bg-zinc-50 hover:text-black transition-colors cursor-pointer disabled:opacity-50"
                >
                  {"->"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
