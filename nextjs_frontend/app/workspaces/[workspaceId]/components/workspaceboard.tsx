"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react"
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export function WorkspaceBoard({ title }: { title: string }) {
  const [wTitle, setWTitle] = useState(title);
  const [messages, setMessages] = useState<ChatMessageEntry[]>([])
  const [query, setQuery] = useState('')
  const [pending, startTransition] = useTransition()

  function onSubmit(formdata: FormData) {
    const query = formdata.get('query');
    const newEntries = [...messages, {message: query?.toString() ?? '', role: ChatRole.HUMAN, id: ''}]
    setMessages(newEntries);
    setQuery('')
  }

  return (
    <div className="p-1 grid grid-rows-[auto_1fr_auto] gap-4 h-full">
      <input className="p-2 rounded-md font-semibold text-xl border-2 border-muted w-full" value={wTitle} onChange={(e) => setWTitle(e.target.value)} />

      <div className="flex flex-col gap-2 bg-accent text-accent-foreground p-3 rounded-lg overflow-scroll">
        {messages.map((msg, idx) => (<ChatMessage key={idx} msgEntry={msg}/>))}
      </div>

      <form action={onSubmit} className="bg-muted text-muted-foreground p-2 rounded-md flex gap-1">
        <Input name="query" placeholder="Your query goes here...." value={query} onChange={(e) => setQuery(e.target.value)}/>
        <Button type="submit" className="flex gap-1">Send <PaperPlaneIcon /></Button>
      </form>
    </div>
  )
}

enum ChatRole {
  AI,
  HUMAN,
}

type ChatMessageEntry = {
  role?: ChatRole;
  message: string;
  id?: string;
}

function ChatMessage({ msgEntry: { role = ChatRole.AI, message } }: { msgEntry: ChatMessageEntry }) {
  return (
    <p className={`bg-primary text-primary-foreground p-2 rounded-2xl ${role == ChatRole.HUMAN ? "max-w max-w-[50%] rounded-br-none self-end" : "w-max max-w-[80%] rounded-bl-none"}`}>{message}</p>
  )
}
