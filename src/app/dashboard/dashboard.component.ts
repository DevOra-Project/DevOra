import { Component } from '@angular/core';
import { ProjectTask } from '../utilities/models/projectTask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  tasks: ProjectTask[] = [
    new ProjectTask('Testing', 'December 10, 2020', 2, 'Prototyping', 50, 'https://via.placeholder.com/150', 'bg-indigo'),
    new ProjectTask('Svg Animations', 'December 10, 2020', 2, 'Prototyping', 80, 'https://via.placeholder.com/150', 'bg-sky'),
    new ProjectTask('UI Development', 'December 10, 2020', 2, 'Prototyping', 20, 'https://via.placeholder.com/150', 'bg-pink'),
    new ProjectTask('Data Analysis', 'December 10, 2020', 2, 'Prototyping', 60, 'https://via.placeholder.com/150', 'bg-green'),
    new ProjectTask('Web Designing', 'December 10, 2020', 2, 'Prototyping', 40, 'https://via.placeholder.com/150', 'bg-blue')
  ];
}

