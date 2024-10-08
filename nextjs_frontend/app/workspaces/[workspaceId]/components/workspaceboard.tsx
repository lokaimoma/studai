"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react"
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { chat } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function WorkspaceBoard({ title, workspaceId, userId }: { title: string, workspaceId: string, userId: string, }) {
  const bottomChatRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [wTitle, setWTitle] = useState(title);
  const [messages, setMessages] = useState<ChatMessageEntry[]>([]);
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(function() {
    bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const newConversations = [
      ...messages,
      { message: query.toString() ?? '', role: ChatRole.HUMAN, id: '' } satisfies ChatMessageEntry
    ]
    setMessages(newConversations);
    chat(query, workspaceId, userId).then(result => {
      if (result.error) {
        toast({ title: "Error chating with StudAI", description: result.error, variant: "destructive" })
        console.error(result.error)
        return
      }

      setMessages([
        ...newConversations,
        { message: result.data ?? '', id: '', role: ChatRole.AI } satisfies ChatMessageEntry
      ])
      setQuery('');
    }).finally(function() {
      setPending(false);
    })
  }

  return (
    <div className="p-1 grid grid-rows-[auto_1fr_auto] gap-4 h-full">
      <input className="p-2 rounded-md font-semibold text-xl border-2 border-muted w-full" value={wTitle} onChange={(e) => setWTitle(e.target.value)} />

      <div className="flex flex-col gap-2 bg-accent text-accent-foreground p-3 rounded-lg overflow-scroll">
        {messages.map((msg, idx) => (<ChatMessage key={idx} msgEntry={msg} />))}
        {pending && (
          <div className="flex gap-1 w-max p-2 rounded-xl bg-primary/10">
            <Skeleton className="w-2 h-2" />
            <Skeleton className="w-2 h-2" />
            <Skeleton className="w-2 h-2" />
          </div>
        )}
        <div ref={bottomChatRef}></div>
      </div>

      <form onSubmit={onSubmit} className="bg-muted text-muted-foreground p-2 rounded-md flex gap-1">
        <Input name="query" placeholder="Your query goes here...." value={query} onChange={(e) => setQuery(e.target.value)} disabled={pending} />
        <Button type="submit" className="flex gap-1" disabled={pending}>Send <PaperPlaneIcon /></Button>
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
