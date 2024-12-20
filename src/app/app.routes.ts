import { Routes } from '@angular/router';
import { GpEntryScreenComponent } from './gp-entry-screen/gp-entry-screen.component';

export const routes: Routes = [
  { path: 'entry', component: GpEntryScreenComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'entry', pathMatch: 'full' },

];
