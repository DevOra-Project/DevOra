import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjectTasks(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${projectId}/tasks`);
  }

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`);
  }

  getProjectTask(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${id}`);
  }

  createProjectTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, task);
  }

  updateProjectTask(id: string, task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task);
  }

  deleteProjectTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }
}
