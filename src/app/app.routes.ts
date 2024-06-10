import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { GithubIntegrationComponent } from './github-integration/github-integration.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { PipelineComponent } from './pipeline/pipeline.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "profile", component: ProfileComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "create-user", component: UserFormComponent },
    { path: "edit-user", component: UserEditComponent },
    { path: "login", component: LoginComponent },
    { path: "github", component: GithubIntegrationComponent },
    { path: "file-manager", component: FileManagerComponent },
    { path: "pipeline", component: PipelineComponent },
];
