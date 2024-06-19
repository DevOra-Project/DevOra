import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { User } from '../utilities/models/user';
import { ProjectProgress } from '../utilities/models/project-progress';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User|any;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router,
  ) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }

    this.user = new User(
      1, // ID del usuario
      'Anne Hathaway',
      'https://via.placeholder.com/100',
      'Lorem ipsum dolor sit amet consectetur adipiscing',
      23,
      49,
      24,
      3,
      5,
      {
        june: {
          year: 2013,
          osStats: {
            ios: 21,
            mac: 48,
            linux: 9,
            win: 32
          }
        }
      },
      [
        new ProjectProgress(101, 'Sat 29/06', 25),
        new ProjectProgress(102, 'Sun 30/06', 22),
        new ProjectProgress(103, 'Mon 01/07', 21),
        new ProjectProgress(104, 'Tue 02/07', 26),
        new ProjectProgress(105, 'Wed 03/07', 27)
      ]
    );
  

  }
  redirectTo(){
    this.router.navigateByUrl("/edit-user")
  }
}
