import { Component } from '@angular/core';
import { Project } from '../utilities/models/project';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageColorService } from '../utilities/services/language-color.service';

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
  constructor(private languageColorService: LanguageColorService) { }

  ngOnInit(): void {
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
  }

  saveChanges(): void {
    this.projectColorChange(this.selectedProject!)
    if (this.selectedProject) {

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
}