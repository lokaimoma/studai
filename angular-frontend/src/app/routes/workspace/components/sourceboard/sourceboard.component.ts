import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../icons/icons.module';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { SourceComponent } from './components/source/source.component';
import { Source } from '../../../../types';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-sourceboard',
  standalone: true,
  imports: [
    IconsModule,
    HlmCheckboxComponent,
    SourceComponent,
    HlmButtonDirective,
  ],
  templateUrl: './sourceboard.component.html',
})
export class SourceboardComponent {
  @Input({ required: true }) sources: Source[] = [];
}
