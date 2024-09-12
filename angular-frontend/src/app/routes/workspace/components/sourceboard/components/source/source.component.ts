import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../../../icons/icons.module';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';

@Component({
  selector: 'app-source',
  standalone: true,
  imports: [IconsModule, HlmCheckboxComponent],
  templateUrl: './source.component.html',
})
export class SourceComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) checked: boolean = false;
}
