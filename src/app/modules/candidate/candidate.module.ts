import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CandidateComponent],
  imports: [CommonModule, CandidateRoutingModule,ReactiveFormsModule,FormsModule],
  exports:[CandidateComponent]
})
export class CandidateModule {}
