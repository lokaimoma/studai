type Workspace = {
  id: string;
  title: string;
};

type Source = {
  name: string;
  id: string;
};

type WorkspaceInfo = {
  title: string;
  sources: Source[];
};

type ChatReqPayload = {
  workspaceId: string;
  message: string;
  userId: string;
};

class Result<T> {
  private data: T | undefined;
  private error: string | undefined;

  setData(data: T) {
    this.data = data;
  }

  setError(error: string) {
    this.error = error;
  }

  isError(): boolean {
    if (this.error !== undefined || this.data === undefined) {
      return true;
    }
    return false;
  }

  getError(): string | undefined {
    return this.error;
  }

  getData(): T | undefined {
    return this.data;
  }
}

export type { Workspace, WorkspaceInfo, Source, ChatReqPayload };
export { Result };
