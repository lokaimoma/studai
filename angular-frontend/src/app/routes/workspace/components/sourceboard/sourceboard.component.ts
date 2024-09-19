import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../icons/icons.module';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { SourceComponent } from './components/source/source.component';
import { Result, Source } from '../../../../types';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmDialogCloseDirective,
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import {
  BrnDialogCloseDirective,
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../../../services/ai-service.service';
import { WorkspaceService } from '../../../../services/workspace.service';

@Component({
  selector: 'app-sourceboard',
  standalone: true,
  imports: [
    IconsModule,
    HlmCheckboxComponent,
    SourceComponent,
    HlmButtonDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogCloseDirective,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogFooterComponent,
    HlmInputDirective,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    FormsModule,
  ],
  templateUrl: './sourceboard.component.html',
})
export class SourceboardComponent {
  @Input({ required: true }) sources: Source[] = [];
  @Input({ required: true }) workspaceId: string = '';
  uploadErrorOccured: boolean = false;
  uploadError: string | undefined;
  pendingUploads: string[] = [];
  files: string[] = [];
  enableUploadBtn: boolean = false;

  constructor(private workspaceService: WorkspaceService) {}

  onFilesSelected(event: Event) {
    const htmlInput = event?.target as HTMLInputElement;
    this.files.splice(0, this.files.length);
    Array.from(htmlInput.files ?? []).forEach((file) => {
      this.files.push(file.name);
    });
    if (this.files.length > 0) {
      this.enableUploadBtn = true;
    } else {
      this.enableUploadBtn = false;
    }
  }

  onDialogClose() {
    this.files.splice(0, this.files.length);
    this.enableUploadBtn = false;
  }

  onSubmitDocuments(event: Event) {
    event.preventDefault();
    this.pendingUploads.splice(0, this.pendingUploads.length);
    const formdata = new FormData(event.target as HTMLFormElement);
    formdata.forEach((value, _) => {
      this.pendingUploads.push((value as unknown as File).name);
    });
    formdata.append('workspaceId', this.workspaceId);

    this.workspaceService.uploadDocuments(formdata).subscribe({
      error: (err: Result<any>) => {
        this.uploadError = err.getError();
        this.uploadErrorOccured = true;
        this.pendingUploads.splice(0, this.pendingUploads.length);

        setTimeout(() => {
          this.uploadError = undefined;
          this.uploadErrorOccured = false;
        }, 3000);
      },
      next: (_) => {
        this.pendingUploads.forEach((f, idx) => {
          this.sources.unshift({
            name: f,
            id: `${f}_${idx + this.sources.length}`,
          } satisfies Source);
        });
        this.pendingUploads.splice(0, this.pendingUploads.length);
      },
    });
  }
}
