import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Result, Workspace, WorkspaceInfo } from '../types';
import { environment } from '../../environments/environment.development';
import { AiService } from './ai-service.service';

const DEFAULT_WORKSPACE_TITLE = 'New workspace, click to edit title';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
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

  public fetchWorkspaceInfo(
    workspaceId: string
  ): Observable<Result<WorkspaceInfo>> {
    const request = this.http
      .get<WorkspaceInfo>(`${environment.apiUrl}/workspace/${workspaceId}`)
      .pipe(retry(2), catchError(AiService.handleAPIError<WorkspaceInfo>));

    return AiService.getResultObservable<WorkspaceInfo>(request);
  }

  public uploadDocuments(
    formdata: FormData
  ): Observable<Result<{ message: string }>> {
    const request = this.http
      .post<{ message: string }>(
        `${environment.apiUrl}/workspace/uploadDocuments`,
        formdata
      )
      .pipe(
        retry(2),
        catchError(AiService.handleAPIError<{ message: string }>)
      );

    return AiService.getResultObservable<{ message: string }>(request);
  }
}
