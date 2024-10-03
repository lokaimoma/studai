import { Result, Source } from "@/app/actions/home"

export async function uploadSources(formdata: FormData): Promise<Result<Source[]>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/uploadDocuments`, {
    method: "POST",
    body: formdata,
  });
  if (!response.ok) {
    return new Result<Source[]>(undefined, await response.text());
  }
  const json = await response.json();
  return new Result<Source[]>(json, undefined);
}
