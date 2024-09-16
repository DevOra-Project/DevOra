import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Step } from '../models/step';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener todos los steps
  getAllSteps(): Observable<Step[]> {
    return this.http.get<Step[]>(`${this.baseUrl}/steps`);
  }

  // Obtener steps por id de tarea
  getStepsByTaskId(taskId: string): Observable<Step[]> {
    return this.http.get<Step[]>(`${this.baseUrl}/tasks/${taskId}/steps`);
  }

  // Crear un nuevo step
  createStep(step: Step): Observable<Step> {
    return this.http.post<Step>(`${this.baseUrl}/steps`, step);
  }

  // Actualizar un step existente
  updateStep(id: number, step: Step): Observable<Step> {
    return this.http.put<Step>(`${this.baseUrl}/steps/${id}`, step);
  }

  // Eliminar un step
  deleteStep(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/steps/${id}`);
  }
}
