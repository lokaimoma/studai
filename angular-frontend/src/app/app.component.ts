import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WellcomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-frontend';
}
