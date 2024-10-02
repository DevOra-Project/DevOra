import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookiesService } from '../utilities/services/cookies.service';
import { ToastrService } from 'ngx-toastr';

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
export class BackupManagerComponent implements OnInit {

  projectPath: string = '';
  backupVersion: string = 'Vs.1.0.0';
  showModal: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private cookiesService: CookiesService,
    private toastr: ToastrService
  ) {
    // Escuchar las respuestas del main process

  }
  ngOnInit(): void {
    (window as any).electronAPI.onCloneProjectResponse((event: any, response: string) => {
      if (response === 'success') {
        console.log('Clonado exitoso');
        this.toastr.success('Clonado exitoso');
      } else {
        console.error('Error en el clonado');
        this.toastr.success('Error en el clonado');
      }
    });

    (window as any).electronAPI.onRollbackProjectResponse((event: any, response: string) => {
      if (response === 'success') {
        console.log('Rollback exitoso');
        this.toastr.success('Rollback exitoso');
      } else {
        console.error('Error en el rollback');
        this.toastr.success('Error en el rollback');
      }
    });

    (window as any).electronAPI.onSelectFolderResponse((event: any, folderPath: string) => {
      if (folderPath) {
        this.projectPath = folderPath;
        console.log('Carpeta seleccionada:', folderPath);
        this.toastr.success('Carpeta seleccionada:', folderPath);
        this.cdr.detectChanges(); // Fuerza la detección de cambios
      } else {
        console.error('Selección de carpeta cancelada');
        this.toastr.error('Selección de carpeta cancelada')
      }
    });
  }
  selectFolder() {
    console.log('entra');
    (window as any).electronAPI.selectFolder();

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
