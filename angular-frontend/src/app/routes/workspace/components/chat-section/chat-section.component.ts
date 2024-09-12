import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmFormFieldComponent } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { IconsModule } from '../../../../icons/icons.module';
import { UserMessageComponent } from './components/user-message/user-message.component';
import { AiMessageComponent } from './components/ai-message/ai-message.component';
import { ChatControlsComponent } from './components/chat-controls/chat-controls.component';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [
    HlmFormFieldComponent,
    HlmInputDirective,
    HlmButtonDirective,
    IconsModule,
    UserMessageComponent,
    AiMessageComponent,
    ChatControlsComponent,
  ],
  templateUrl: './chat-section.component.html',
})
export class ChatSectionComponent {}
