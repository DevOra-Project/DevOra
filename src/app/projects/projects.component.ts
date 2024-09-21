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
    if(this.newProject.localPath==null||this.newProject.localPath==null||this.newProject.localPath==undefined){
      this.toastr.warning("Please select a local path")
      this.newProject.localPath =" "
    }
    this.projectService.createProject(this.newProject).subscribe((res: any) => {
      console.log(res);
      this.projects.push(res); // Agrega el nuevo proyecto a la lista
      
      // Crear asignación de usuario a proyecto
      const userId = this.cookiesService.getToken('user_id'); // Obtén el user_id del token
      const userProject = new UserProject(parseInt(this.cookiesService.getToken('user_id')), res.id,res.localPath);

      console.log(userProject)
      this.userProjectService.createUserProject(userProject).subscribe(
        (upRes: any) => {
        console.log("Asignación creada:", upRes);
        this.toastr.success("Asignación creada:", upRes);
        this.cdr.detectChanges(); // Fuerza la detección de cambios
        (error:any)=>{
          console.log(error);
        }
      });
    });
    this.closeNewProjectModal(); // Cierra el modal
  }


  closeNewProjectModal(): void {
    this.newProject = undefined // Reinicia el proyecto al cerrar
  }

  redirectToProjectTask(projectId:number){
    this.router.navigate(['/dashboard/'+projectId]);  
  }
}
