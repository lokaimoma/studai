import { Component } from '@angular/core';
import { IconsModule } from '../../../../icons/icons.module';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { SourceComponent } from './components/source/source.component';

@Component({
  selector: 'app-sourceboard',
  standalone: true,
  imports: [IconsModule, HlmCheckboxComponent, SourceComponent],
  templateUrl: './sourceboard.component.html',
})
export class SourceboardComponent {}
