import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentary } from '../models/commentary';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentaryService {

  private apiUrl = environment.apiUrl; // Ajusta esta variable según tu configuración

  constructor(private http: HttpClient) { }

  getCommentariesByStep(stepId: number): Observable<Commentary[]> {
    return this.http.get<Commentary[]>(`${this.apiUrl}/steps/${stepId}/commentaries`);
  }

  
}
