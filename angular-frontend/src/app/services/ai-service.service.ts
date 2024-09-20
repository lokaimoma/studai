import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatReqPayload, Result, Workspace } from '../types';
import { catchError, map, Observable, of, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) {}

  public chatWithAI(
    chatReqPayload: ChatReqPayload
  ): Observable<Result<String>> {
    const request = this.http
      .post<string>(`${environment.apiUrl}/ai`, JSON.stringify(chatReqPayload))
      .pipe(retry(3), catchError(AiService.handleAPIError<string>));

    return AiService.getResultObservable<string>(request);
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
