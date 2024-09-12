import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ai-message',
  standalone: true,
  imports: [],
  templateUrl: './ai-message.component.html',
})
export class AiMessageComponent {
  @Input({ required: true }) message: string = '';
}
