"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react"
import { PaperPlaneIcon } from "@radix-ui/react-icons"; 

export function WorkspaceBoard({ title }: { title: string }) {
  const [wTitle, setWTitle] = useState(title);
  return (
    <div className="p-1 grid grid-rows-[auto_1fr_auto] gap-4 h-full">
      <input className="p-2 rounded-md font-semibold text-xl border-2 border-muted w-full" value={wTitle} onChange={(e) => setWTitle(e.target.value)} />

      <div className="flex flex-col gap-2 bg-accent text-accent-foreground p-3 rounded-lg overflow-scroll">
        <ChatMessage message="This is an AI message"/>
        <ChatMessage message="This is a user query" role={ChatRole.HUMAN}/>
      </div>

      <div className="bg-muted text-muted-foreground p-2 rounded-md flex gap-1">
        <Input placeholder="Your query goes here...."/>
        <Button className="flex gap-1">Send <PaperPlaneIcon /></Button>
      </div>
    </div>
  )
}

enum ChatRole {
  AI,
  HUMAN,
}

function ChatMessage({ role = ChatRole.AI, message }: {role?: ChatRole; message: string}) {
  return (
    <p className={`bg-primary text-primary-foreground p-2 rounded-2xl ${role == ChatRole.HUMAN ? "w-[50%] rounded-br-none self-end bg-indigo-700": "w-[80%] rounded-bl-none"}`}>This is an AI message</p>
  )
}
