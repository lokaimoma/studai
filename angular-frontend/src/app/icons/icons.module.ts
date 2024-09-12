import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Upload, Sun } from 'angular-feather/icons';

const icons = { Upload, Sun };

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
