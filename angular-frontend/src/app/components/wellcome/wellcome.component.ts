import { Component } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-wellcome',
  standalone: true,
  imports: [IconsModule, HlmButtonDirective],
  templateUrl: './wellcome.component.html',
  styleUrl: './wellcome.component.css',
})
export class WellcomeComponent {}
