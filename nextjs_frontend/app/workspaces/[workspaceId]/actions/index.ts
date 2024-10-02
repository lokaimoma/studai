import { Result } from "@/app/actions/home"

export async function uploadSources(formdata: FormData): Promise<Result<string>>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace/uploadDocuments`, {
    method: "POST",
    body: formdata,
  })
  const msg = await response.text();
  if (!response.ok) {
    return new Result<string>(undefined, msg);
  }
  return new Result<string>(msg, undefined)
}
