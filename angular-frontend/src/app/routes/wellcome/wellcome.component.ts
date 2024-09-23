import { Component } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { AiService } from '../../services/ai-service.service';
import { Result, Workspace } from '../../types';
import { Router } from '@angular/router';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-wellcome',
  standalone: true,
  imports: [
    IconsModule,
  ],
  templateUrl: './wellcome.component.html',
})
export class WellcomeComponent {
  errorOccurred: boolean = false;
  workspaceId: string | undefined;
  creatingWorkspace: boolean = false;
  error: string | undefined;

  constructor(
    private workspaceService: WorkspaceService,
    private router: Router
  ) {}

  onCreateWorkspaceClicked() {
    this.creatingWorkspace = true;
    // to simulate a bit of latence
    setTimeout(() => {
      this.workspaceService.createWorkSpace().subscribe({
        next: (response) => {
          this.creatingWorkspace = false;
          this.errorOccurred = false;
          this.workspaceId = response.getData()?.id;
        },
        error: (error: Result<Workspace>) => {
          this.creatingWorkspace = false;
          this.errorOccurred = true;
          this.error = error.getError();
        },
        complete: () => {
          setTimeout(() => {
            this.router.navigate(['/workspace', this.workspaceId]);
          }, 2000);
        },
      });
    }, 2000);
  }
}
