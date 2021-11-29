import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { EditCandidateComponent } from './candidates/edit-candidate/edit-candidate.component';
import { ImportCandidateComponent } from './candidates/import-candidate/import-candidate.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';

@NgModule({
  declarations: [
    AdminComponent,
    AddCandidateComponent,
    EditCandidateComponent,
    CandidatesComponent,
    ImportCandidateComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
