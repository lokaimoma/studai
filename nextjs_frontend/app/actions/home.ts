type Source = {
  id: string;
  name: string;
}

type Workspace = {
  sources: Source[];
  id: string;
  title: string;
}

class Result<T> {
  private _data: T | undefined
  private _error: any

  constructor(data: T | undefined, error: any) {
    this._data = data;
    this._error = error;
  }

  public get data(): T | undefined {
    return this._data
  }

  public get error(): any {
    return this._error;
  }

  public get isError(): boolean {
    return this._error != undefined
  }
}

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
    return new Result<Workspace>(undefined, await response.text())
  }

  const json = await response.json()

  const result = new Result<Workspace>(json, undefined);
  return result;
}

export {createWorkspace, Result};
export type {Source}
