"use server";
import { Result, Source } from "@/app/actions/home"

export async function uploadSources(formdata: FormData): Promise<Result<Source[]>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/uploadDocuments`, {
    method: "POST",
    body: formdata,
  });
  if (!response.ok) {
    return { error: await response.text() } satisfies Result<Source[]>;
  }
  const json = await response.json() as Source[];
  return { data: json } satisfies Result<Source[]>;
}

export async function chat(message: string, workspaceId: string, userId: string): Promise<Result<string>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      userId,
      workspaceId
    })
  })

  const msg = await response.text()

  if (!response.ok) {
    return { error: msg } satisfies Result<string>;
  }

  return { data: msg } satisfies Result<string>
}

