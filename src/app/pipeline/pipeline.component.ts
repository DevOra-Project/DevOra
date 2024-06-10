import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Step } from '../utilities/models/step';

@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule
  ],
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.scss'
})
export class PipelineComponent {
  constructor(private toastr: ToastrService) {}
  steps: Step[] = [
    { name: 'Creación del Proyecto', command: 'ng new my-app', status: 'pending' },
    { name: 'Desarrollo', command: 'ng serve', status: 'pending' },
    { name: 'Producción', command: 'ng build --prod', status: 'pending' },
    { name: 'Despliegue', command: 'ng deploy', status: 'pending' }
  ];
  
  currentStep: Step | null = null;
  newCommand: string = '';
  // Funciones para el modal de configuración
  openConfigModal(step: Step) {
    this.currentStep = step;
    this.newCommand = step.command;
    (document.getElementById('configModal') as HTMLDialogElement).showModal();
  }

  closeModal() {
    (document.getElementById('configModal') as HTMLDialogElement).close();
  }

  saveConfig() {
    if (this.currentStep) {
      this.currentStep.command = this.newCommand;
      this.toastr.success('Configuración guardada', 'Éxito');
    }
    this.closeModal();
  }

  // Funciones para el modal de confirmación
  checkAndExecuteStep(step: Step) {
    if (step.status === 'completed') {
      this.currentStep = step;
      (document.getElementById('confirmModal') as HTMLDialogElement).showModal();
    } else {
      this.executeStep(step);
    }
  }

  closeConfirmModal() {
    (document.getElementById('confirmModal') as HTMLDialogElement).close();
  }

  confirmExecution() {
    if (this.currentStep) {
      this.executeStep(this.currentStep);
      this.toastr.success('Pipeline re-ejecutado', 'Éxito');
    }
    this.closeConfirmModal();
  }

  // Función para ejecutar el paso del pipeline
  executeStep(step: Step) {
    this.toastr.info(`Ejecutando: ${step.command}`, 'Ejecutando');
    step.status = 'in-progress';
    setTimeout(() => {
      step.status = 'completed';
      this.toastr.success(`Completado: ${step.command}`, 'Éxito');
    }, 2000); // Simulación de tiempo de ejecución
  }
}