"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useTransition } from "react";
import { createWorkspace } from "./actions/home";
import { useRouter } from "next/navigation";

export default function Home() {
  const [pending, startTransition] = useTransition();
  const [createOppSuc, setCreateOppSuc] = useState<boolean | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const router = useRouter();

  function onCreateWorkspace() {
    startTransition(async function() {
      const result = await createWorkspace();
      if (result.error) {
        setCreateOppSuc(false)
        setError(result.error)
        return;
      }

      setCreateOppSuc(true)
      setTimeout(function () {
        router.push(`workspaces/${encodeURIComponent(result.data!.id)}`)
      }, 3000)
    })
  }
  return (
    <div>
      <h3>Wellcome to studAI</h3>
      <Button onClick={onCreateWorkspace} disabled={pending}>Create Workspace</Button>
      {pending ? (<p>Creating workspace please wait....</p>) : (<></>)}
      {createOppSuc && (
        <>
          {createOppSuc === true ? (<>Workspace created successfully. Redirecting soon....</>) : (<>Failed to create worksapce: <span>{error}</span></>)}
          </>
      )}
    </div>
  );
}
