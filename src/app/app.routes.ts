import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "profile", component: ProfileComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "create-user", component: UserFormComponent },
    { path: "edit-user", component: UserEditComponent },
    { path: "login", component: LoginComponent },
];
