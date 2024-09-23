import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../../../../icons/icons.module';

@Component({
  selector: 'app-source',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './source.component.html',
})
export class SourceComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) checked: boolean = false;
}
