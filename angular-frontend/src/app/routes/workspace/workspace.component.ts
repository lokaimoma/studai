import { Component } from '@angular/core';
import { SourceboardComponent } from './components/sourceboard/sourceboard.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [SourceboardComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
})
export class WorkspaceComponent {}
