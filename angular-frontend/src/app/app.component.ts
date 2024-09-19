import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WellcomeComponent } from './routes/wellcome/wellcome.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkspaceComponent } from './routes/workspace/workspace.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    WellcomeComponent,
    NavbarComponent,
    WorkspaceComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-frontend';
}
