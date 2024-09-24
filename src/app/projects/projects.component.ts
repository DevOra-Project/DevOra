import { ChangeDetectorRef, Component } from '@angular/core';
import { Project } from '../utilities/models/project';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageColorService } from '../utilities/services/language-color.service';
import { ProjectService } from '../utilities/services/project.service';
import { Router } from '@angular/router';
import { CookiesService } from '../utilities/services/cookies.service';
import { UserProject } from '../utilities/models/user_project';
import { UserProjectService } from '../utilities/services/user-project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proyects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  selectedProject: Project | null = null;

  projects: Project[] = [
  
  ];

  newProject :Project|any; // Inicializa un nuevo proyecto

  constructor(private languageColorService: LanguageColorService,
    private projectService:ProjectService,
    private cookiesService:CookiesService,
    private userProjectService: UserProjectService,
    private toastr: ToastrService,
    private router:Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  /*    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });  */
    this.projectService.getProjectsByUserId(this.cookiesService.getToken('user_id')).subscribe(data => {
      this.projects = data;
    }); 
    
    this.projects.forEach(project => {
      this.projectColorChange(project)
    });

  }
  getLanguageColor(language: string): string {
    switch (language) {
      case 'Angular':
        return 'bg-red-500'; // Rojo para Angular
      case 'HTML':
        return 'bg-orange-500'; // Naranja para HTML
      case 'CSS':
        return 'bg-blue-500'; // Azul para CSS
      case 'Node.js':
        return 'bg-green-500'; // Verde para Node.js
      case 'Spring Boot':
        return 'bg-teal-600'; // Teal para Spring Boot
      case 'TypeScript':
        return 'bg-blue-400'; // Azul claro para TypeScript
      case 'Vue':
        return 'bg-green-400'; // Verde claro para Vue
      case 'C#':
        return 'bg-purple-600'; // Morado para C#
      default:
        return 'bg-gray-400'; // Gris para lenguajes desconocidos
    }
  }
  projectColorChange(project:Project){
      if (project.language) {
        project.languageColor = this.languageColorService.getColor(project.language);
      }
  }
  openModal(project: Project): void {
    this.selectedProject = { ...project }; 
    console.log(this.selectedProject)
  }

  saveChanges(): void {
    this.projectColorChange(this.selectedProject!)
    if (this.selectedProject) {
      console.log(this.selectedProject)
      this.projectService.updateProject(this.selectedProject!.id!,this.selectedProject).subscribe((res:any)=>{
        console.log(res)
        this.cdr.detectChanges(); // Fuerza la detección de cambios
      })
      const index = this.projects.findIndex(p => p.name === this.selectedProject!.name);
      if (index !== -1) {
        this.projects[index] = { ...this.selectedProject };
      } 
    }

    /*  this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    }); *///Reload forzado, mejorar
    this.projectService.getProjectsByUserId(this.cookiesService.getToken('user_id')).subscribe(data => {
      this.projects = data;
    });
    this.cdr.detectChanges(); 
    
    this.closeModal();
  
  }

  closeModal(): void {
    this.selectedProject = null;
  }


  openNewProjectModal(): void {
    this.newProject = new Project('', '', ''); // Reinicia el nuevo proyecto al abrir el modal
  }

  createProject(): void {
    this.toastr.clear();
    
    if (this.newProject.localPath == null || this.newProject.localPath == undefined) {
      this.toastr.warning("Please asign later a local path");
      this.newProject.localPath = " ";
    }
  
    if (this.newProject.description !== "" && this.newProject.description != null && 
        this.newProject.name !== "" && this.newProject.name != null) {
      
      this.projectService.createProject(this.newProject).subscribe(
        (res: any) => {
          console.log(res);
          this.projects.push(res); // Agrega el nuevo proyecto a la lista
  
          // Introduce un retraso antes de crear la asignación de usuario
          setTimeout(() => {
            const userId = this.cookiesService.getToken('user_id');
            const userProject = new UserProject(parseInt(userId), res.id, res.localPath);
  
            console.log(userProject);
            this.userProjectService.createUserProject(userProject).subscribe(
              (upRes: any) => {
                console.log("Asignación creada:", upRes);
                this.toastr.success("Asignación creada:", upRes);
                this.cdr.detectChanges();
              },
              (error: any) => {
                console.log(error);
              }
            );
          }, 2000); // Retraso de 2 segundos antes de ejecutar el createUserProject
        },
        (error: any) => {
          this.toastr.error("Ocurrió un error al crear el proyecto");
        }
      );
      
      this.closeNewProjectModal(); // Cierra el modal
    } else {
      this.toastr.warning("Complete correctamente los campos");
    }
  }
  

  closeNewProjectModal(): void {
    this.newProject = undefined // Reinicia el proyecto al cerrar
  }

  redirectToProjectTask(projectId:number){
    this.router.navigate(['/dashboard/'+projectId]);  
  }
}
