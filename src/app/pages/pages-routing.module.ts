import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './_layout/layout.component';
import {AdminGuard} from '../core/guards/admin.guard';
import {CandidateGuard} from '../core/guards/candidate.guard';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import ('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            }, {
                path: 'admin',
                canActivate: [AdminGuard],
                loadChildren: () => import ('../modules/admin/admin.module').then((m) => m.AdminModule)
            }, {
                path: 'candidate',
                canActivate: [CandidateGuard],
                loadChildren: () => import ('../modules/candidate/candidate.module').then((m) => m.CandidateModule)
            }, {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
        ]
    }, {
        path: 'notFound',
        component: ErrorComponent

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
