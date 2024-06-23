import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = environment.apiUrl; // Reemplaza con la base URL de tu backend

  constructor(private http: HttpClient) { }

  // Obtener todas las notificaciones del usuario
  getUserNotifications(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/users/${userId}/notifications`);
  }

  // Obtener todas las notificaciones de un proyecto específico
  getProjectNotifications(projectId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/projects/${projectId}/notifications`);
  }

  // Crear una nueva notificación
  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/notifications`, notification);
  }

  // Actualizar una notificación existente
  updateNotification(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.baseUrl}/notifications/${notification.id}`, notification);
  }

  // Eliminar una notificación existente
  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/notifications/${notificationId}`);
  }
}
