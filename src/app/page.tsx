"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const router = useRouter();
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess(data) {
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center w-full">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          disabled={createProject.isPending}
          onClick={() => createProject.mutate({ value: value })}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Page;
