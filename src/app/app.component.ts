import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'DevOra';


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  
) { }
ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    initFlowbite();
  }
}
}
