import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UserProject } from '../models/user_project';

@Injectable({
  providedIn: 'root'
})
export class UserProjectService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addUserToProject(userId: string, projectId: string, localPath: string): Observable<any> {
    const body = { localPath }; // Enviar localPath en el cuerpo
    return this.http.post(`${this.baseUrl}/users/${userId}/projects/${projectId}`, body);
  }
  

  createUserProject(userProject: UserProject): Observable<UserProject> {
    return this.http.post<UserProject>(`${this.baseUrl}/user_projects`, userProject);
  }

}
