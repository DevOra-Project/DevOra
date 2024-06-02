import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "profile", component: ProfileComponent },
    { path: "dashboard", component: DashboardComponent },

];
