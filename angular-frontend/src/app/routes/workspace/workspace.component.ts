import { Component, Input } from '@angular/core';
import { SourceboardComponent } from './components/sourceboard/sourceboard.component';
import { ChatSectionComponent } from './components/chat-section/chat-section.component';
import { LoadingSkeletonComponent } from './components/loading-skeleton/loading-skeleton.component';
import { WorkspaceService } from '../../services/workspace.service';
import { Chat, ChatEntity, Result, WorkspaceInfo } from '../../types';
import { AiService } from '../../services/ai-service.service';

const DEFAULT_AI_RESPONSE = "AI didn't return any valid response";
@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    SourceboardComponent,
    ChatSectionComponent,
    LoadingSkeletonComponent
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  loading: boolean = true;
  errorOccurred: boolean = false;
  error: string | undefined;
  workspaceInfo: WorkspaceInfo | undefined;
  workspaceId: string = '';
  chats: Chat[] = [];

  constructor(
    private workspaceService: WorkspaceService,
    private aiService: AiService
  ) {}

  onForwardQueryToAI(query: string) {
    this.chats.push({ message: query, entity: ChatEntity.USER });
    this.aiService
      .chatWithAI({
        message: query,
        userId: 'user-123',
        workspaceId: this.workspaceId,
      })
      .subscribe({
        error: (err: Result<any>) => {
          this.error = err.getError();
          this.errorOccurred = true;
        },
        next: (response) => {
          this.chats.push({
            entity: ChatEntity.AI,
            message: response.getData() ?? DEFAULT_AI_RESPONSE,
          });
        },
      });
  }

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
        },
      });
    }, 0);
  }
}
