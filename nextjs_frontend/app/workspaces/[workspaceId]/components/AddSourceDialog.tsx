"use client";
import { Dialog, DialogDescription, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlusIcon } from "@radix-ui/react-icons"
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ACCEPTED_FILE_TYPES = [
  "text/plain", "application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/epub+zip", "application/vnd.ms-powerpoint", "application/rtf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]
const MAX_FILE_SIZE = 5000000

const uploadSourceSchema = z.object({
  documents: z.any(),
  workspaceId: z.string().min(5),
})

export function AddSourceDialog({ workspaceId, onUploadSource }: { workspaceId: string, onUploadSource: (formdata: FormData) => void, }) {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof uploadSourceSchema>>({
    resolver: zodResolver(uploadSourceSchema),
    defaultValues: {
      "workspaceId": workspaceId
    }
  })

  function onSubmit(formdata: FormData) {
    form.clearErrors()
    const documents: File[] = formdata.getAll("documents") as File[]
    for (const doc of documents) {
      if (doc.size > MAX_FILE_SIZE) {
        form.setError("documents", { message: "Each file must be less than 6MB" })
        console.error("File size too large", doc)
        return;
      }
      if (!ACCEPTED_FILE_TYPES.includes(doc.type)) {
        form.setError("documents", { message: "A selected document doesn't have a valid file type" })
        return;
      }
    }
    form.reset()
    setOpenDialog(false)
    onUploadSource(formdata)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger><FilePlusIcon width={"24px"} height={"24px"} /></DialogTrigger>

      <DialogContent>
        <DialogTitle>Add source</DialogTitle>
        <DialogDescription>Add document sources from which the AI should reference it's answers</DialogDescription>

        <Form {...form}>
          <form action={onSubmit}>
            <input type="hidden" name="workspaceId" value={workspaceId} />
            <FormField control={form.control} name="documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document(s)</FormLabel> <FormControl>
                    <Input name={field.name} onChange={field.onChange} type="file" multiple required />
                  </FormControl>
                  <FormDescription>
                    Upload documents of type ".txt", ".pdf", ".doc", ".docx" or ".rtf"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-2 mt-3 justify-end">
              <Button type="submit">Upload</Button>
              <DialogClose asChild>
                <Button type="button" variant="destructive">Cancel</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>

    </Dialog>

  )
}
