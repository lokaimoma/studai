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
  errorOccured: boolean = false;
  workspaceId: string | undefined;
  creatingWorkspace: boolean = false;
  error: string | undefined;

  constructor(private aiService: AiService) {}

  onCreateWorkspaceClicked() {
    this.creatingWorkspace = true;
    // to simulate a bit of latence
    setTimeout(() => {
      this.aiService.createWorkSpace().subscribe((response) => {
        this.creatingWorkspace = false;
        if (response.isError()) {
          this.errorOccured = true;
          this.error = response.getError();
          return;
        }
        this.errorOccured = false;
        this.workspaceId = response.getData()?.id;
      });
    }, 2000);
  }
}
