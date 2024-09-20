import { Component, EventEmitter, Output } from '@angular/core';
import { IconsModule } from '../../../../../../icons/icons.module';

@Component({
  selector: 'app-chat-controls',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './chat-controls.component.html',
})
export class ChatControlsComponent {
  query: string = '';
  @Output() sendQueryEvent = new EventEmitter<string>();

  onQueryInputChanged(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
  }

  emitChat() {
    this.sendQueryEvent.emit(this.query);
    this.query = '';
  }
}
