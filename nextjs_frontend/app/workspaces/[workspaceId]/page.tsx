import { Source } from "@/app/actions/home";
import { SidebarClose } from "lucide-react";
import { SourceSideBar } from "./components/sidebar";
import { WorkspaceBoard } from "./components/workspaceboard";

export type WorkspacePayload = {
  title: string;
  sources: Source[]
}

async function Page({ params }: { params: { workspaceId: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/${params.workspaceId}`)
  if (!response.ok) {
    return (
      <>
        <p>
          Failed to fetch workpace info.
          Workspace ID: {params.workspaceId}
        </p>
      </>
    )
  }

  const workspaceInfo: WorkspacePayload = await response.json();

  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 h-screen">
      <div className="w-[200px] h-full">
        <SourceSideBar workspaceId={params.workspaceId} workspaceInfo={workspaceInfo} />
      </div>

      <div className="">
        <WorkspaceBoard title={workspaceInfo.title}/>
        </div>
    </div>
  )
}

export default Page;
