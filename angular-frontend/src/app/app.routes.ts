import { Route, Routes } from '@angular/router';
import { WellcomeComponent } from './routes/wellcome/wellcome.component';
import { WorkspaceComponent } from './routes/workspace/workspace.component';

export const routes: Routes = [
  {
    title: 'wellcome',
    component: WellcomeComponent,
    path: '',
  },
  {
    title: 'workspace',
    component: WorkspaceComponent,
    path: 'workspace',
  },
];
