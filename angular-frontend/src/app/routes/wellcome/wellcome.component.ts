import { Component } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AiService } from '../../services/ai-service.service';

@Component({
  selector: 'app-wellcome',
  standalone: true,
  imports: [IconsModule, HlmButtonDirective],
  templateUrl: './wellcome.component.html',
})
export class WellcomeComponent {
  errorOccured: boolean | undefined;
  workspaceId: string | undefined;

  constructor(private aiService: AiService) {}

  onCreateWorkspaceClicked() {
    this.aiService.createWorkSpace().subscribe((response) => {});
  }
}
