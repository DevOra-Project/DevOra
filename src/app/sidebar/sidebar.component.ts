import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { IconsComponent } from './icons/icons.component';
import { routes } from '../app.routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
  
    IconsComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  items = [
    { icon: 'home', label: 'Home', link: '/' },
    { icon: 'trending_up', label: 'Pipelines',link: 'pipeline' },
    { icon: 'notifications', label: 'Notifications',link: 'notifications'},
    { icon: 'favourites', label:'Projects',link: 'projects'},
    { icon: 'settings', label: 'File explorer',link: 'file-explorer'},
    { icon: 'person', label: 'Profile',link: 'profile' },
    { icon: 'clone', label: 'clone', link: 'backup-manager' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  ){}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }

  }

}
