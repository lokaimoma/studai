import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry } from 'rxjs';
import { Result, WorkspaceInfo } from '../types';
import { environment } from '../../environments/environment.development';
import { AiService } from './ai-service.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}

  public fetchWorkspaceInfo(
    workspaceId: string
  ): Observable<Result<WorkspaceInfo>> {
    const request = this.http
      .get<WorkspaceInfo>(`${environment.apiUrl}/workspace/${workspaceId}`)
      .pipe(retry(2), catchError(AiService.handleAPIError<WorkspaceInfo>));

    return AiService.getResultObservable<WorkspaceInfo>(request);
  }
}
