"use client";
import { ViewNoneIcon, CheckboxIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { uploadSources } from "../actions";
import { AddSourceDialog } from "./AddSourceDialog";
import { WorkspacePayload } from "../page";
import { Source } from "@/app/actions/home";
import { useToast } from "@/hooks/use-toast";

export function SourceSideBar({ workspaceId, workspaceInfo }: { workspaceId: string, workspaceInfo: WorkspacePayload, }) {
  const { toast } = useToast();
  const [_, startTransition] = useTransition();
  const [pendingFiles, setPendingFiles] = useState<string[]>([])
  const [fileUpdatePending, setFileUpdatePending] = useState(false)
  const [sources, setSources] = useState<Source[]>(workspaceInfo.sources)

  function onUploadSources(formdata: FormData) {
    startTransition(async function() {
      const documents = formdata.getAll("documents") as File[]
      setPendingFiles(documents.map(file => file.name))
      setFileUpdatePending(true)
      uploadSources(formdata).then(function(result) {
        if (result.isError) {
          console.error("Request error", result.error)
          toast({ description: result.error, title: "Failed to upload source(s)", variant: "destructive" })
          return;
        }
        if (result.data) {
          const newSources = [...result.data, ...sources]
          setSources(newSources)
          console.log("Sources", newSources)
        }
      }).finally(() => {
        setFileUpdatePending(false)
        setPendingFiles([])
      });
    })
  }

  return (
    <aside className="p-2 h-full flex flex-col gap-8 bg-muted">
      <div className="flex gap-2 items-center justify-between">
        <header className="font-bold">Sources</header>
        <AddSourceDialog workspaceId={workspaceId} onUploadSource={onUploadSources} />
      </div>

      <ul className="flex flex-col gap-1">
        {sources.map(source => (
          <div className="flex items-center gap-2 p-1 border-2 rounded">
            <li className="truncate" key={source.id}>{source.name}</li>
            <CheckboxIcon />
          </div>
        ))}
        {!fileUpdatePending && sources.length == 0 && (
          <div className="flex flex-col items-center">
            <ViewNoneIcon height={"24px"} width={"24px"} />
            <p>No sources added yet</p>
          </div>
        )}
        {fileUpdatePending && pendingFiles.map((f, id) => (<li key={id} className="animate-pulse">{f}</li>))}
      </ul>
    </aside>
  )
}
