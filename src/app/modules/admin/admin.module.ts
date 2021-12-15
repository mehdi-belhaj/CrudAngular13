import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CandidatesComponent } from './candidates/view-candidate/candidates.component';
import { EditCandidateComponent } from './candidates/edit-candidate/edit-candidate.component';
import { ImportCandidateComponent } from './candidates/import-candidate/import-candidate.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminComponent,
    AddCandidateComponent,
    EditCandidateComponent,
    CandidatesComponent,
    ImportCandidateComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    AdminRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],

})
export class AdminModule { }
