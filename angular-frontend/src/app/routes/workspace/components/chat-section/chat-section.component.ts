import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldComponent } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { IconsModule } from '../../../../icons/icons.module';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [
    HlmFormFieldComponent,
    HlmInputDirective,
    HlmButtonDirective,
    IconsModule,
  ],
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.css',
})
export class ChatSectionComponent {}
