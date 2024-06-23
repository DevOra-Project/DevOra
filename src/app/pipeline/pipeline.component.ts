import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Step } from '../utilities/models/step';
import { Commentary } from '../utilities/models/commentary';
import { ElectronService } from 'ngx-electron';
import { CommentaryService } from '../utilities/services/commentary.service';

@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule,
    
  ],
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.scss'
})
export class PipelineComponent implements OnInit{
  constructor(
    private toastr: ToastrService,
    private commentaryService: CommentaryService
  ) {

    (window as any).electronAPI.onSelectFolderResponse((event: any, folderPath: string) => {
      if (folderPath) {
        this.currentDirectory = folderPath;
        console.log('Carpeta seleccionada:', folderPath);
        console.log('Carpeta actualizada:', this.currentDirectory);
      } else {
        console.error('Selección de carpeta cancelada');
      }
    });

  }

  steps: Step[] = [
    { id:1, name: 'Creación del Proyecto', command: 'ng new my-app', status: 'pending',lastRun: new Date() },
    { id:2, name: 'Desarrollo', command: 'ng serve', status: 'pending',lastRun: new Date() },
    { id:3, name: 'Producción', command: 'ng build', status: 'pending',lastRun: new Date() },
    { id:4, name: 'Despliegue', command: 'ng deploy', status: 'pending',lastRun: new Date() }
  ];
  stepOnExecution: Step|any;

  // STEP CONFIGURTION
  stepSettingsModalOpen: boolean = false; // Variable para controlar la apertura del modal
  stepOnConfig: Step = new Step('', '', '', new Date()); // Step seleccionado para editar (vacío inicialmente)



  //Comments
  comments: Commentary[] = [
    // Comentarios para el pipeline "Creación del Proyecto"
    { pipelineId: 1, user: 'Alice', message: 'He creado el proyecto inicial utilizando el comando `ng new my-app`. Todo parece estar configurado correctamente.', timestamp: new Date() },
    { pipelineId: 1, user: 'Bob', message: 'Verifiqué la estructura del proyecto y todo se ve bien. ¿Alguien tiene alguna sugerencia para los módulos iniciales?', timestamp: new Date() },
    { pipelineId: 1, user: 'Charlie', message: 'Asegúrense de que el archivo `angular.json` esté configurado para nuestro entorno de desarrollo.', timestamp: new Date() },
  
    // Comentarios para el pipeline "Desarrollo"
    { pipelineId: 2, user: 'David', message: 'Estoy ejecutando `ng serve` para levantar el servidor de desarrollo. Todo funciona sin errores hasta ahora.', timestamp: new Date() },
    { pipelineId: 2, user: 'Eve', message: 'He notado que algunos estilos no se están aplicando correctamente. Revisaré los archivos SCSS.', timestamp: new Date() },
    { pipelineId: 2, user: 'Frank', message: 'He añadido un par de componentes básicos. Revisen el repositorio y denme feedback.', timestamp: new Date() },
    { pipelineId: 2, user: 'Grace', message: 'El servidor de desarrollo está funcionando bien en mi máquina. Podemos proceder con la integración de más características.', timestamp: new Date() },
  
    // Comentarios para el pipeline "Producción"
    { pipelineId: 3, user: 'Henry', message: 'He generado el build de producción con `ng build --prod`. El tamaño del bundle parece adecuado.', timestamp: new Date() },
    { pipelineId: 3, user: 'Isabel', message: 'Revisé el build y todo parece estar optimizado. Necesitamos probarlo en un entorno staging.', timestamp: new Date() },
    { pipelineId: 3, user: 'Jack', message: 'Encontré un pequeño bug en el entorno de producción. Lo arreglaré y volveré a generar el build.', timestamp: new Date() },
    { pipelineId: 3, user: 'Karen', message: 'El build de producción se completó sin errores. Vamos a proceder con las pruebas finales.', timestamp: new Date() },
  
    // Comentarios para el pipeline "Despliegue"
    { pipelineId: 4, user: 'Leo', message: 'He comenzado el proceso de despliegue utilizando `ng deploy`. La aplicación está subiendo al servidor.', timestamp: new Date() },
    { pipelineId: 4, user: 'Mia', message: 'El despliegue fue exitoso. Revisen el sitio en producción y confirmen que todo está funcionando.', timestamp: new Date() },
    { pipelineId: 4, user: 'Nina', message: 'Encontré un problema menor después del despliegue. Voy a arreglarlo y redeploy.', timestamp: new Date() },
    { pipelineId: 4, user: 'Oscar', message: 'El sitio en producción está funcionando correctamente. Buen trabajo, equipo!', timestamp: new Date() },
    { pipelineId: 4, user: 'Paula', message: 'Revisé el despliegue y todo se ve bien. Podemos proceder con las próximas características.', timestamp: new Date() },
  ];
  
  currentStep: Step | null = null;
  newCommand: string = '';

  //////COmments CONCEPT
  newComment: string = '';
  selectedPipeline: Step | null = null;
  filteredComments: Commentary[] = [];

  ///Command execution:
  command: string = '';
  output: string = '';
  error: string = '';
  currentDirectory: string = '';//Probably deprecated

  commandExecuting: boolean = false;

  directory: string = '';



  ngOnInit(): void {
    this.getCurrentDirectory(); // Obtener el directorio actual al iniciar la aplicación
    
  }

  // Funciones para el modal de configuración
  openModal(step:Step) {
    this.stepSettingsModalOpen = true; // Abrir el modal
    this.stepOnConfig = step;
  }

  closeModal() {
    this.stepSettingsModalOpen = false; // Cerrar el modal
  }

  saveChanges() {
    // Aquí implementarías la lógica para guardar los cambios del step seleccionado
    console.log('Guardando cambios:', this.stepOnConfig);
    this.closeModal(); // Cerrar el modal después de guardar
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
    this.stepOnExecution= step;
    this.toastr.info(`Ejecutando: ${step.command}`, 'Ejecutando');
    step.status = 'in-progress';
   /*  setTimeout(() => {
      step.status = 'completed';
      this.toastr.success(`Completado: ${step.command}`, 'Éxito');
    }, 2000); // Simulación de tiempo de ejecución
     */
    this.command=step.command;


  }



  //////////////COMMENTS CONCEPT

  getCommentaries(pipeline: Step): void {
    this.commentaryService.getCommentariesByStep(+pipeline.id!)
      .subscribe(
        (commentaries) => {
          this.comments = commentaries;
        },
        (error) => {
          console.error('Error fetching commentaries:', error);
          // Aquí podrías implementar manejo de errores adicional si es necesario
        }
      );
  }
  addComment(pipelineId: number) {
    if (this.newComment.trim()) {
      const newComment: Commentary = {
        id: this.comments.length + 1,
        pipelineId: pipelineId,
        user: 'Current User', // Aquí puedes usar el nombre de usuario actual
        message: this.newComment,
        timestamp: new Date(),
      };

      this.comments.push(newComment);
      this.newComment = '';
    }
  }
  filterComments() {
    if (this.selectedPipeline) {
      this.filteredComments = this.comments.filter(c => c.pipelineId === this.selectedPipeline!.id);
    } else {
      this.filteredComments = [];
    }
  }

  closeDiscussion(){
    this.selectedPipeline = null;
  }

  selectPipeline(pipeline: Step) {
    this.selectedPipeline = pipeline;
    this.filterComments();
    //this.getCommentaries(pipeline);
    console.log(pipeline)
  }

  ///COMMAND execution functions

 /*  selectDirectory(): void {
    (window as any).electronAPI.selectfolder().then((dir: string) => {
      this.currentDirectory = dir; // Actualizar el directorio actual seleccionado
    }).catch((error: any) => {
      this.error += 'Error selecting directory: ' + error + '\n';
    });
  } */
    selectDirectory(): void {
      (window as any).electronAPI.selectFolder();
      console.log(this.currentDirectory)
    } 
 /*  executeCommand(): void {
    this.output = '';
    this.error = '';

    if ((window as any).electronAPI && this.currentDirectory) {
      (window as any).electronAPI.openTerminal(this.command, this.currentDirectory)
        .then((response: any) => {
          this.output += response + '\n';
        })
        .catch((error: any) => {
          this.error += 'Error: ' + error + '\n';
        });
    } else {
      this.error += 'Unable to execute command. Current directory not available.\n';
    }
  } */
    executeCommand() {
      this.commandExecuting = true;
      if ((<any>window).electronAPI) {
        (<any>window).electronAPI.executeCommand(this.command)
          .then((result: any) => {
            this.output = result.output;
            this.error = result.error;
            this.getCurrentDirectory(); // Actualizar el directorio después de ejecutar el comando
            this.commandExecuting = false; // Marcar como finalizado
            this.stepOnExecution.status = 'completed';
            this.toastr.success(`Completado: ${this.stepOnExecution.command}`, 'Éxito');
          })
          .catch((error: any) => {
            this.error = error.message;
            this.commandExecuting = false; // Marcar como finalizado
            this.stepOnExecution.status = 'error';
            this.toastr.success(`Ocurrión un error: ${this.stepOnExecution.command}`, '.');

          
          });
      } else {
        console.error('Electron API not available');
        this.commandExecuting = false; // Marcar como finalizado en caso de error
      }
    }


  getCurrentDirectory() {
    if ((<any>window).electronAPI) {
      (<any>window).electronAPI.getCurrentDirectory()
        .then((dir: string) => {
          this.currentDirectory = dir;
          console.log(this.currentDirectory)
        })
        .catch((error: any) => {
          this.error = error.message;
        });
    } else {
      console.error('Electron API not available');
    }
  }


}




