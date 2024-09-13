import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  Upload,
  Sun,
  PlusSquare,
  Book,
  Send,
  Clock,
  AlertTriangle,
  CheckCircle,
} from 'angular-feather/icons';

const icons = {
  Upload,
  Sun,
  PlusSquare,
  Book,
  Send,
  Clock,
  AlertTriangle,
  CheckCircle,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
