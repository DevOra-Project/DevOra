import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Notification } from '../utilities/models/notification';


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

  unseenNotifications: Notification[] = [];
  recentSeenNotifications: Notification[] = [];
  allSeenNotifications: Notification[] = [];
  showAllSeen: boolean = false;

  ngOnInit() {
    this.updateNotifications();
  }

  updateNotifications() {
    this.unseenNotifications = this.notifications.filter(notification => !notification.seen);
    this.recentSeenNotifications = this.notifications
      .filter(notification => notification.seen)
      .slice(-5);
    this.allSeenNotifications = this.notifications.filter(notification => notification.seen);
  }

  markAsSeen(notification: Notification) {
    notification.seen = true;
    this.updateNotifications();
  }

  toggleShowAllSeen() {
    this.showAllSeen = !this.showAllSeen;
  }
}