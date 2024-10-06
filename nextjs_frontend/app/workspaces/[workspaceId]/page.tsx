import { Source } from "@/app/actions/home";
import { SidebarClose } from "lucide-react";
import { SourceSideBar } from "./components/sidebar";

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
    <div className="flex gap-7 flex-wrap h-screen overflow-hidden">
      <div className="w-[200px] h-full">
        <SourceSideBar workspaceId={params.workspaceId} workspaceInfo={workspaceInfo} />
      </div>

      <div>
        <h3>{workspaceInfo.title}</h3>
      </div>
    </div>
  )
}

export default Page;
