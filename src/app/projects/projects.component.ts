import { Component } from '@angular/core';
import { Project } from '../utilities/models/project';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageColorService } from '../utilities/services/language-color.service';
import { ProjectService } from '../utilities/services/project.service';
import { Router } from '@angular/router';

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
    new Project('LandingDP', 'LandingDP'),
    new Project('MovilesApps', 'MovilesApps repository'),
    new Project('CheapShop-Frontend', 'Forked from Good-Solutions/CheapShop-Frontend', 'Vue'),
    new Project('LearningCenterAPI', 'ACME learning center', 'C#','c-sharp'),
    new Project('IOTLandingPage', 'IOTLandingPage', 'CSS'),
    new Project('psychohelp_webapp', 'Forked from PsychoHelp-App-Moviles/psychohelp_webapp', 'TypeScript')
  ];


  constructor(private languageColorService: LanguageColorService,
    private projectService:ProjectService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
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
      })
      const index = this.projects.findIndex(p => p.name === this.selectedProject!.name);
      if (index !== -1) {
        this.projects[index] = { ...this.selectedProject };
      } 
    }
    this.closeModal();
  
  }

  closeModal(): void {
    this.selectedProject = null;
  }

  redirectToProjectTask(projectId:number){
    this.router.navigate(['/dashboard/'+projectId]);  
  }
}
