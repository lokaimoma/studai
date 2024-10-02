"use client";
import { ViewNoneIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { uploadSources } from "../actions";
import { AddSourceDialog } from "./AddSourceDialog";
import { WorkspacePayload } from "../page";

export function SourceSideBar({ workspaceId, workspaceInfo }: { workspaceId: string, workspaceInfo: WorkspacePayload, }) {
  const [pending, startTransition] = useTransition();
  const [pendingFiles, setPendingFiles] = useState<string[]>([])

  function onUploadSources(formdata: FormData) {
    startTransition(async function() {
      const documents = formdata.getAll("documents") as File[]
      setPendingFiles(documents.map(file => file.name))
      const result = await uploadSources(formdata);
      console.error("Request error", result.error)
      console.log("Request data", result.data)
    })
  }

  return (
    <aside>
      <div className="flex gap-2 items-center justify-between">
        <header className="font-bold">Sources</header>
        <AddSourceDialog workspaceId={workspaceId} onUploadSource={onUploadSources} />
      </div>

      <ul>
        {workspaceInfo.sources.map(source => (<li key={source.id}>{source.name}</li>))}
        {!pending && workspaceInfo.sources.length == 0 && (
          <div className="flex flex-col items-center">
            <ViewNoneIcon height={"24px"} width={"24px"} />
            <p>No sources added yet</p>
          </div>
        )}
        {pending && pendingFiles.map(f => (<li className="animate-pulse">{f}</li>))}
      </ul>
    </aside>
  )
}
