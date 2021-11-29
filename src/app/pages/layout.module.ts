import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './_layout/layout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from '../modules/admin/admin-routing.module';
import { CandidateRoutingModule } from '../modules/candidate/candidate-routing.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AdminRoutingModule,
    CandidateRoutingModule,
  ],
})
export class LayoutModule {}
