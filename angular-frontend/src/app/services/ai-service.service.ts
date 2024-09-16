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
      .pipe(retry(2), catchError(AiService.handleAPIError<Workspace>));

    return AiService.getResultObservable<Workspace>(request);
  }

  public static getResultObservable<T>(
    observable: Observable<T | Result<T>>
  ): Observable<Result<T>> {
    return observable.pipe(
      map((payload) => {
        if (payload instanceof Result) {
          // error was caught
          return payload;
        }
        const result = new Result<T>();
        result.setData(payload as unknown as T);
        return result;
      })
    );
  }

  public static handleAPIError<T>(
    error: HttpErrorResponse
  ): Observable<Result<T>> {
    let errorPrefix;
    if (error.status === HttpStatusCode.InternalServerError) {
      errorPrefix = 'Server failed to process request';
    } else {
      errorPrefix = 'Request failed to go throw';
    }
    const result = new Result<T>();
    result.setError(`${errorPrefix} : ${error.message}`);
    return throwError(() => result);
  }
}
