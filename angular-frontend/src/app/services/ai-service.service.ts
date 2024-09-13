import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result, Workspace } from '../types';
import { catchError, map, Observable, of, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

const DEFAULT_WORKSPACE_TITLE = 'New workspace, click to edit title';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) {}

  createWorkSpace(): Observable<Result<Workspace>> {
    const request = this.http
      .post<Workspace>(
        `${environment.apiUrl}/workspace`,
        {
          title: DEFAULT_WORKSPACE_TITLE,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(retry(2), catchError(this.handleAPIError));

    return request.pipe(
      map((workspace) => {
        if (workspace instanceof Result) {
          // error was caught
          return workspace;
        }
        const result = new Result<Workspace>();
        result.setData(workspace as unknown as Workspace);
        return result;
      })
    );
  }

  private handleAPIError(
    error: HttpErrorResponse
  ): Observable<Result<Workspace>> {
    let errorPrefix;
    if (error.status === HttpStatusCode.InternalServerError) {
      errorPrefix = 'Server failed to process request';
    } else {
      errorPrefix = 'Request failed to go throw';
    }
    const result = new Result<Workspace>();
    result.setError(`${errorPrefix} : ${error.message}`);
    return throwError(() => result);
  }
}
