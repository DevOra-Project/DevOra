import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { GithubIntegrationComponent } from './github-integration/github-integration.component';

import { PipelineComponent } from './pipeline/pipeline.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectsComponent } from './projects/projects.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { BackupManagerComponent } from './backup-manager/backup-manager.component';
import { authGuard } from './utilities/guard/auth.guard';
import { LoginHistoryComponent } from './login-history/login-history.component';

export const routes: Routes = [

    { path: "profile", component: ProfileComponent , canActivate: [authGuard] },
    { path: "dashboard", component: DashboardComponent,  canActivate: [authGuard] },
    { path: 'register', component: UserFormComponent  },
    { path: "edit-user", component: UserEditComponent , canActivate: [authGuard] },
    { path: "login", component: LoginComponent  },
    { path: "github", component: GithubIntegrationComponent , canActivate: [authGuard] },
    { path: "pipeline", component: PipelineComponent , canActivate: [authGuard] },
    { path: "notifications", component: NotificationsComponent , canActivate: [authGuard] },
    { path: "projects", component: ProjectsComponent , canActivate: [authGuard] },
    { path: "file-explorer", component: FileExplorerComponent , canActivate: [authGuard] },
    { path: "backup-manager", component: BackupManagerComponent , canActivate: [authGuard] },
    { path: "role", component: RoleFormComponent , canActivate: [authGuard] },
    { path: "login-history", component: LoginHistoryComponent , canActivate: [authGuard] },
    //PATHS compuestos:

    { path: 'pipeline/:taskId', component: PipelineComponent },
    { path: 'dashboard/:projectId', component: DashboardComponent },
    { path: '', redirectTo: '/projects', pathMatch: 'full' }
];
