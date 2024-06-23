import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Notification } from '../utilities/models/notification';
import { NotificationService } from '../utilities/services/notifications.service';
import { UserService } from '../utilities/services/user.service';
import { ProjectService } from '../utilities/services/project.service';
import { firstValueFrom } from 'rxjs';
import { Project } from '../utilities/models/project';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

  
  notifications: Notification[] = [
    // Aquí añadirás las notificaciones simuladas o reales.
    { id: 1, message: 'Pipeline executed successfully', timestamp: new Date(), seen: false, type: 'pipeline' },
    { id: 2, message: 'New push to repository', timestamp: new Date(), seen: false, type: 'github' },
    { id: 3, message: 'Pipeline execution failed', timestamp: new Date(), seen: true, type: 'pipeline' },
    // ... más notificaciones
  ];

  userNotifications: Notification[] = [];
  projectNotifications: Notification[] = [];


  unseenNotifications: Notification[] = [];
  recentSeenNotifications: Notification[] = [];
  allSeenNotifications: Notification[] = [];
  showAllSeen: boolean = false;

  constructor(private notificationService: NotificationService,
    private userService: UserService,
    private projectService:ProjectService
  ){}

  ngOnInit() {
    this.updateNotifications();
    const userId = '3'; // Reemplaza con el ID del usuario actual obtenido de tu aplicación

    this.fetchNotifications(userId);

    this.updateNotifications();
  }


  async fetchNotifications(userId: string) {
    try {
      await this.loadUserNotifications(userId);
      await this.loadAllProjectNotifications(userId);

      // Combina las notificaciones de usuario y de proyecto
      this.notifications = [...this.userNotifications, ...this.projectNotifications];

      console.log('notifications:', this.notifications);

      this.updateNotifications();
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }
  async loadUserNotifications(userId: string) {
    try {
      const notifications = await this.notificationService.getUserNotifications(userId).toPromise();
      this.userNotifications = notifications || []; // Asegúrate de que sea un arreglo
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      throw error; // Propagate the error up if needed
    }
  }
  
  async loadAllProjectNotifications(userId: string) {
    try {
      const projects = await this.projectService.getProject(userId).toPromise();
  
      this.projectNotifications = []; // Clear previous notifications
      if (Array.isArray(projects)) {
        for (const project of projects) {
          const notifications = await this.notificationService.getProjectNotifications(project.id).toPromise();
          this.projectNotifications.push(...(notifications || [])); // Asegúrate de que sea un arreglo
        }
      } else {
        const notifications = await this.notificationService.getProjectNotifications(projects.id).toPromise();
        this.projectNotifications.push(...(notifications || [])); // Asegúrate de que sea un arreglo
        console.error('Projects is not an array:', projects);
      }
    } catch (error) {
      console.error('Error fetching project notifications:', error);
      throw error; // Propagate the error up if needed
    }
  }

  updateNotifications() {
    this.unseenNotifications = this.notifications.filter(notification => !notification.seen);
    this.recentSeenNotifications = this.notifications
      .filter(notification => notification.seen)
      .slice(-5);
    this.allSeenNotifications = this.notifications.filter(notification => notification.seen);
  }
  markAsSeenUpdate(notification: Notification) {
    notification.seen = true;
    this.notificationService.updateNotification(notification).subscribe(updatedNotification => {
      // Actualizar la lista local de notificaciones
      const index = this.notifications.findIndex(notif => notif.id === updatedNotification.id);
      if (index !== -1) {
        this.notifications[index] = updatedNotification;
        this.updateNotifications();
      }
    }, error => {
      console.error('Error updating notification:', error);
      // Si hay un error, puedes revertir el cambio en el objeto local si es necesario
      notification.seen = false;
    });
  }


  markAsSeen(notification: Notification) {
    notification.seen = true;
    this.markAsSeenUpdate(notification)
    this.updateNotifications();
  }

  toggleShowAllSeen() {
    this.showAllSeen = !this.showAllSeen;
  }
}