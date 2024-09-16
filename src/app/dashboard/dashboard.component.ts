import { Component, OnInit } from '@angular/core';
import { ProjectTask } from '../utilities/models/projectTask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../utilities/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

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
export class DashboardComponent implements OnInit{


  //NEW TASK
  newTask: ProjectTask = new ProjectTask(0, '', '', 0, '', 0, 'bg-blue');
  isModalOpen: boolean = false;
  //tasks
  tasks: ProjectTask[] = [
  /*  new ProjectTask(1,'Testing', 'December 10, 2020', 2, 'Prototyping', 50, 'bg-red'),
    new ProjectTask(2,'Svg Animations', 'December 10, 2020', 2, 'Prototyping', 80, 'bg-red'),
    new ProjectTask(3,'UI Development', 'December 10, 2020', 2, 'Prototyping', 20, 'bg-red'),
    new ProjectTask(4,'Data Analysis', 'December 10, 2020', 2, 'Prototyping', 60, 'bg-red'),
    new ProjectTask(5,'Web Designing', 'December 10, 2020', 2, 'Prototyping', 40, 'bg-red') */
  ];
  constructor(
    private projectTaskService:TaskService,
    private route:ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('projectId');
      if (projectId) {
        this.loadProjectTasks(projectId);
      } else {
        //this.loadAllTasks();
      }
    });
  }

/*   loadAllTasks(){
    console.log('load all tasks');
    this.projectTaskService.getAllTasks().subscribe((tsk:any)=>{
      this.tasks=tsk;
      console.log(this.tasks)
    })
  }
 */  
  loadProjectTasks(projectId: string){
    console.log('loadProyectTasks');
    this.projectTaskService.getProjectTasks(projectId).subscribe((tsk:any)=>{
      this.tasks=tsk;
      console.log(this.tasks)
      })
  }

  redirectToTaskStep(taskId:number){
    this.router.navigate(['/pipeline/'+taskId]);
  }

  //Modal add task
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  saveTask() {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if (projectId) {
      this.newTask.projectId = +projectId;
      this.projectTaskService.createProjectTask(this.newTask).subscribe((createdTask: ProjectTask) => {
        this.tasks.push(createdTask);
        this.closeModal(); // Cerrar el modal una vez creada la tarea
      });
    }
  }


  /* saveTask() {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if (projectId) {
      // Asegurar que la fecha está en el formato correcto 'YYYY-MM-DD'
      this.newTask.date = new Date(this.newTask.date).toISOString().split('T')[0];  // Convertir la fecha al formato 'YYYY-MM-DD'
      this.newTask.projectId = +projectId;
  
      // Enviar la tarea al servicio para guardarla en la base de datos
      this.projectTaskService.createProjectTask(this.newTask).subscribe((createdTask: ProjectTask) => {
        this.tasks.push(createdTask);
        this.closeModal(); // Cerrar el modal una vez creada la tarea
      });
    }
  } */
  
}

