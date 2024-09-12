import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WellcomeComponent } from './routes/wellcome/wellcome.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkspaceComponent } from './routes/workspace/workspace.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    WellcomeComponent,
    NavbarComponent,
    WorkspaceComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-frontend';
}
