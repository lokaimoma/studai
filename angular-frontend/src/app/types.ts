type Workspace = {
  id: string;
  title: string;
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
}

export type { Workspace };
export { Result };
