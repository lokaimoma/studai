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
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

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
  ],
  templateUrl: './sourceboard.component.html',
})
export class SourceboardComponent {
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

  @Input({ required: true }) sources: Source[] = [];
}
