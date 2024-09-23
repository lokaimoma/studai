import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../../../../icons/icons.module';
import { UserMessageComponent } from './components/user-message/user-message.component';
import { AiMessageComponent } from './components/ai-message/ai-message.component';
import { ChatControlsComponent } from './components/chat-controls/chat-controls.component';
import { Chat } from '../../../../types';
import { ChatEntity } from '../../../../types';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [
    IconsModule,
    UserMessageComponent,
    AiMessageComponent,
    ChatControlsComponent,
  ],
  templateUrl: './chat-section.component.html',
})
export class ChatSectionComponent {
  @Input({ required: true }) workspaceTitle: string = '';
  @Input({ required: true }) chats: Chat[] = [];
  AI_ENTITY = ChatEntity.AI;
  USER_ENTITY = ChatEntity.USER;
  @Output() forwardQueryToAI = new EventEmitter<string>();

  onSendQuery(query: string) {
    this.forwardQueryToAI.emit(query);
  }
}
