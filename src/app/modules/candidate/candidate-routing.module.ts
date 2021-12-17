import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateComponent,
    // canActivate: [AppAuthGuard],
    children: [{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
