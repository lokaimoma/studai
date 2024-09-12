import { Route, Routes } from '@angular/router';
import { WellcomeComponent } from './components/wellcome/wellcome.component';

export const routes: Routes = [
  {
    title: 'Welcome',
    component: WellcomeComponent,
    path: '',
  },
];
