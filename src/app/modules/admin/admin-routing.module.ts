import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { EditCandidateComponent } from './candidates/edit-candidate/edit-candidate.component';
import { ImportCandidateComponent } from './candidates/import-candidate/import-candidate.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'candidates',
        component: CandidatesComponent,
      },
      {
        path: 'newCandidate',
        component: AddCandidateComponent,
      },
      {
        path: 'updateCandidate',
        component: EditCandidateComponent,
      },
      {
        path: 'importCandidate',
        component: ImportCandidateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
