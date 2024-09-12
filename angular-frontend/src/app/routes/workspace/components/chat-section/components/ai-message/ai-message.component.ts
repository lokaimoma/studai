import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ai-message',
  standalone: true,
  imports: [],
  templateUrl: './ai-message.component.html',
  styleUrl: './ai-message.component.css',
})
export class AiMessageComponent {
  @Input({ required: true }) message: string = '';
}
