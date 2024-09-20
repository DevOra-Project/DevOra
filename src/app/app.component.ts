import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from './utilities/services/auth.service';
import { SidebarService } from './utilities/services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    HttpClientModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'DevOra';

  sideNavCollapse: boolean = false;
  showLayout = true;
  sidebarVisible = false;
  sidebarSubscription!: Subscription;


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private router: Router,
  private sidebarService: SidebarService,
  private authService: AuthService){
    this.sidebarService.sidebarVisible$.subscribe(
      (isVisible) => {
        this.sidebarVisible = isVisible;
        console.log('AppComponent sidebar visibility:', this.sidebarVisible);
      },
      (error) => {
        console.error('Error handling sidebar visibility in AppComponent:', error);
      }
    );
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
    if(this.authService.isAuthenticated()){
      //this.router.navigateByUrl("/evaluation");
    }else{
      this.router.navigateByUrl("/login");
    }
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !event.url.includes('/login');
      }
    });
    this.sidebarSubscription = this.sidebarService.sidebarVisible$.subscribe((isVisible) => {
      this.sidebarVisible = isVisible;
    });
  }
  ngOnDestroy(): void {
    this.sidebarSubscription.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}