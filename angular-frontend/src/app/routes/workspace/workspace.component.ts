import { Component, Input, OnInit } from '@angular/core';
import { SourceboardComponent } from './components/sourceboard/sourceboard.component';
import { ChatSectionComponent } from './components/chat-section/chat-section.component';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { LoadingSkeletonComponent } from './components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    SourceboardComponent,
    ChatSectionComponent,
    HlmSkeletonComponent,
    LoadingSkeletonComponent,
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit {
  loading: boolean = true;

  @Input({ required: true })
  set id(id: string) {}

  ngOnInit(): void {
    console.log(this.id);
  }
}
