import { Component, Input } from '@angular/core';
import { SourceboardComponent } from './components/sourceboard/sourceboard.component';
import { ChatSectionComponent } from './components/chat-section/chat-section.component';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { LoadingSkeletonComponent } from './components/loading-skeleton/loading-skeleton.component';
import { environment } from '../../../environments/environment.development';
import { WorkspaceService } from '../../services/workspace.service';
import { Result, WorkspaceInfo } from '../../types';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    SourceboardComponent,
    ChatSectionComponent,
    HlmSkeletonComponent,
    LoadingSkeletonComponent,
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  loading: boolean = true;
  errorOccurred: boolean = false;
  error: string | undefined;
  workspaceInfo: WorkspaceInfo | undefined;
  workspaceId: string = '';

  constructor(private workspaceService: WorkspaceService) {}

  @Input({ required: true })
  set id(id: string) {
    this.workspaceId = id;
    // fetch info about the workspace (title, sources)
    setTimeout(() => {
      this.workspaceService.fetchWorkspaceInfo(id).subscribe({
        next: (response) => {
          this.workspaceInfo = response.getData();
          this.loading = false;
          this.errorOccurred = false;
        },
        error: (error: Result<WorkspaceInfo>) => {
          this.loading = false;
          this.error = error.getError();
          this.errorOccurred = true;
          console.error('ERROR', error, this.loading && !this.errorOccurred);
        },
      });
    }, 0);
  }
}
