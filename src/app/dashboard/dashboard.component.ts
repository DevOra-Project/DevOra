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
    new ProjectTask('Testing', 'December 10, 2020', 2, 'Prototyping', 50, 'bg-red'),
    new ProjectTask('Svg Animations', 'December 10, 2020', 2, 'Prototyping', 80, 'bg-red'),
    new ProjectTask('UI Development', 'December 10, 2020', 2, 'Prototyping', 20, 'bg-red'),
    new ProjectTask('Data Analysis', 'December 10, 2020', 2, 'Prototyping', 60, 'bg-red'),
    new ProjectTask('Web Designing', 'December 10, 2020', 2, 'Prototyping', 40, 'bg-red')
  ];
}

