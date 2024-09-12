import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Upload, Sun, PlusSquare, Book, Send } from 'angular-feather/icons';

const icons = { Upload, Sun, PlusSquare, Book, Send };

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
