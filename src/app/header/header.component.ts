import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { SidebarService } from '../utilities/services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
  private sidebarService: SidebarService,
  ) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
  toggleSidebar() {
    console.log()
    this.sidebarService.toggleSidebar();
  }
}
