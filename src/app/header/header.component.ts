import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { SidebarService } from '../utilities/services/sidebar.service';
import { UserService } from '../utilities/services/user.service';
import { User } from '../utilities/models/user';
import { CookiesService } from '../utilities/services/cookies.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
  private sidebarService: SidebarService,
  private userService: UserService,
  private cookieService: CookiesService
  ) { }
  user: User|any;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
    this.userService.getUser(parseInt(this.cookieService.getToken("user_id")))
  }
  toggleSidebar() {
    console.log()
    this.sidebarService.toggleSidebar();
  }
}
