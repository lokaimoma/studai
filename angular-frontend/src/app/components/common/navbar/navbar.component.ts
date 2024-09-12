import { Component } from '@angular/core';
import { IconsModule } from '../../../icons/icons.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
