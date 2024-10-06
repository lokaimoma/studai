"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react"

export function WorkspaceBoard({title}: {title: string}) {
  const [wTitle, setWTitle] = useState(title);
  return (
      <div className="h-full p-1">
        <input className="p-2 rounded-md font-semibold text-xl border-2 border-muted w-full" value={wTitle} onChange={(e) => setWTitle(e.target.value)}/>
      </div>
  )
}
