import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../icons/icons.module';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { SourceComponent } from './components/source/source.component';
import { Source } from '../../../../types';
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
  pendingUploads: string[] = [];
  files: string[] = [];
  enableUploadBtn: boolean = false;

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
    formdata.append('workspaceId', this.workspaceId);
    formdata.forEach((value, _) => this.pendingUploads.push(value.toString()));
  }
}
