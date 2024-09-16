import { Component } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AiService } from '../../services/ai-service.service';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconComponent } from '../../../../components/ui-icon-helm/src/lib/hlm-icon.component';
import { Result, Workspace } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wellcome',
  standalone: true,
  imports: [
    IconsModule,
    HlmButtonDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertDescriptionDirective,
    HlmAlertTitleDirective,
    HlmIconComponent,
    HlmIconComponent,
  ],
  templateUrl: './wellcome.component.html',
})
export class WellcomeComponent {
  errorOccurred: boolean = false;
  workspaceId: string | undefined;
  creatingWorkspace: boolean = false;
  error: string | undefined;

  constructor(private aiService: AiService, private router: Router) {}

  onCreateWorkspaceClicked() {
    this.creatingWorkspace = true;
    // to simulate a bit of latence
    setTimeout(() => {
      this.aiService.createWorkSpace().subscribe({
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
