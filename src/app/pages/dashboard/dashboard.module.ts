import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { CandidatesComponent } from '../../modules/admin/candidates/view-candidate/candidates.component';
import { CandidateComponent } from '../../modules/candidate/candidate.component';
import { CandidateModule } from '../../modules/candidate/candidate.module';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    CandidateModule





  ],

})
export class DashboardModule { }
