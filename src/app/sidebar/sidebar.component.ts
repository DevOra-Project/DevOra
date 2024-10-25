import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { IconsComponent } from './icons/icons.component';
import { routes } from '../app.routes';
import { Subscription } from 'rxjs';
import { SidebarService } from '../utilities/services/sidebar.service';
import { AuthService } from '../utilities/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    RouterOutlet, 
  
    IconsComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  isVisible = false;
  sidebarSubscription: Subscription | null = null;


  items = [
    { icon: 'favourites', label:'Projects',link: 'projects'},
    { icon: 'home', label: 'Tasks', link: 'dashboard' },
    { icon: 'trending_up', label: 'Pipelines',link: 'pipeline' },
    { icon: 'notifications', label: 'Notifications',link: 'notifications'},
    { icon: 'clone', label: 'Backup clones', link: 'backup-manager' },  
    { icon: 'settings', label: 'File explorer',link: 'file-explorer'},
    { icon: 'person', label: 'Profile',link: 'profile' },
    { icon: 'history', label: 'Login history',link: 'login-history' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sidebarService: SidebarService,
    private authService: AuthService,
  ){}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }

  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
    try {
      this.authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }


}
