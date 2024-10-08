import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects`);
  }

  getProject(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${id}`);
  }

    // Nuevo método para obtener proyectos por userId
  getProjectsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/user/${userId}`);
  }
  
  createProject(project: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects`, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/projects/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`);
  }
}
