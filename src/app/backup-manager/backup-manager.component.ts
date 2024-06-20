import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-backup-manager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './backup-manager.component.html',
  styleUrl: './backup-manager.component.scss'
})
export class BackupManagerComponent {

  projectPath: string = '';
  backupVersion: string = 'Vs.1.0.0';
  showModal: boolean = false;

  constructor() {
    // Escuchar las respuestas del main process
    (window as any).electronAPI.onCloneProjectResponse((event: any, response: string) => {
      if (response === 'success') {
        console.log('Clonado exitoso');
      } else {
        console.error('Error en el clonado');
      }
    });

    (window as any).electronAPI.onRollbackProjectResponse((event: any, response: string) => {
      if (response === 'success') {
        console.log('Rollback exitoso');
      } else {
        console.error('Error en el rollback');
      }
    });

    (window as any).electronAPI.onSelectFolderResponse((event: any, folderPath: string) => {
      if (folderPath) {
        this.projectPath = folderPath;
        console.log('Carpeta seleccionada:', folderPath);
      } else {
        console.error('Selección de carpeta cancelada');
      }
    });
  }

  selectFolder() {
    console.log('entra');
    (window as any).electronAPI.selectFolder();
    console.log('entra');
   /*  (window as any).electronAPI.onSelectFolderResponse((event: any, folderPath: string) => {
      if (folderPath) {
        this.projectPath = folderPath;
        console.log('Carpeta seleccionada:', folderPath);
      } else {
        console.error('Selección de carpeta cancelada');
      }
    }); */


  }

  cloneProject() {
    if (this.projectPath) {
      (window as any).electronAPI.cloneProject(this.projectPath, this.backupVersion);
    } else {
      console.error('No se ha seleccionado una carpeta');
    }
  }

  confirmRollback() {
    this.showModal = true;
  }

  rollbackProject() {
    if (this.projectPath) {
      (window as any).electronAPI.rollbackProject(this.projectPath, this.backupVersion);
      this.showModal = false;
    } else {
      console.error('No se ha seleccionado una carpeta');
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
