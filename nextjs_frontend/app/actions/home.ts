"use server";
type Source = {
  id: string;
  name: string;
}

type Workspace = {
  sources: Source[];
  id: string;
  title: string;
}

type Result<T> = {
  data?: T;
  error?: string;
}

// class Result<T> {
//   private _data: T | undefined
//   private _error: any

//   constructor(data: T | undefined, error: any) {
//     this._data = data;
//     this._error = error;
//   }

//   public get data(): T | undefined {
//     return this._data
//   }

//   public get error(): any {
//     return this._error;
//   }

//   public get isError(): boolean {
//     return this._error != undefined
//   }
// }

async function createWorkspace(): Promise<Result<Workspace>> {
  const payload = {
    title: "New workspace"
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    return { error: await response.text() } satisfies Result<Workspace>;
  }

  const json = await response.json()

  const result = { data: json } satisfies Result<Workspace>; return result;
}

export { createWorkspace, };
export type { Source, Result }
