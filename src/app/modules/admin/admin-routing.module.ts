import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';
import { CandidatesComponent } from './candidates/view-candidate/candidates.component';
import { EditCandidateComponent } from './candidates/edit-candidate/edit-candidate.component';
import { ImportCandidateComponent } from './candidates/import-candidate/import-candidate.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { title: 'Page Title' },
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'candidates',
        component: CandidatesComponent,
        data: { title: 'Page Title' },
      },
      {
        path: 'newCandidate',
        component: AddCandidateComponent,
        data: { title: 'Page Title' },
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
