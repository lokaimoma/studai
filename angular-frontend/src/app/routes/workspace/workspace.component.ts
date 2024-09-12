import { Component } from '@angular/core';
import { SourceboardComponent } from './components/sourceboard/sourceboard.component';
import { ChatSectionComponent } from './components/chat-section/chat-section.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [SourceboardComponent, ChatSectionComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
})
export class WorkspaceComponent {}
