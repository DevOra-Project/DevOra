import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Step } from '../utilities/models/step';
import { Commentary } from '../utilities/models/commentary';
import { ElectronService } from 'ngx-electron';
import { CommentaryService } from '../utilities/services/commentary.service';
import { ActivatedRoute } from '@angular/router';
import { StepService } from '../utilities/services/step.service';
import { Task } from 'electron';
import { TaskService } from '../utilities/services/task.service';
import { ProjectTask } from '../utilities/models/projectTask';
import { CookiesService } from '../utilities/services/cookies.service';

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
    private route:ActivatedRoute,
    private commentaryService: CommentaryService,
    private stepService: StepService,
    private taskService: TaskService,
    private cookiesService: CookiesService
  ) {

    

  }

  currenTaskId:string = ''
  steps: Step[] = [];
  stepOnExecution: Step|any;
  newStep: Step = {
    id: 0,
    name: '',
    command: '',
    status: '',
  };

  // STEP CONFIGURTION
  stepSettingsModalOpen: boolean = false; // Variable para controlar la apertura del modal
  stepOnConfig: Step = new Step('', '', ''); // Step seleccionado para editar (vacío inicialmente)
  //Comments
  comments: Commentary[] = [

  ];
  currentUserId :number|any  ;

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
  currentDirectory: string = '';//Probably deprecate
  commandExecuting: boolean = false;
  directory: string = '';

  //Actual project - task
  actualTask:Task|any

  //MOdal create
  isCreateModalOpen: boolean = false;
  openModalCreate() {
    this.isCreateModalOpen = true;
  }

  // Función para cerrar el modal
  closeModalCreate() {
    this.isCreateModalOpen = false;
  }

  ngOnInit(): void {
    this.getCurrentDirectory(); // Obtener el directorio actual al iniciar la aplicación
    this.route.paramMap.subscribe(params => {
      this.currenTaskId = params.get('taskId')!;
      if (this.currenTaskId) {
        this.loadStepByTaskId(this.currenTaskId );
        this.taskService.getProjectTask(this.currenTaskId ).subscribe(
          (response:ProjectTask)=>{
            this.actualTask = response
            this.currentUserId = parseInt(this.cookiesService.getToken("user_id"))
            },
          error =>{
            this.toastr.error('Error al traer task')
          }
        )
        //this.actualTask = taskId;
      } else {
        //this.loadAllTasks();
      }
    });

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

  loadAllSteps(){
    this.stepService.getAllSteps().subscribe((stps:any)=>{
      this.steps = stps;
      console.log(this.steps)
    })
  }
  loadStepByTaskId(taskId: string){
    this.stepService.getStepsByTaskId(taskId).subscribe((stps:any)=>{
      this.steps = stps;
      console.log(this.steps)
    })
  }
  // Funciones para el modal de configuración
  openModal(step:Step) {
    this.stepSettingsModalOpen = true; // Abrir el modal
    this.stepOnConfig = step;
  }

  closeModal() {
    this.stepSettingsModalOpen = false; // Cerrar el modal
  }

  saveChanges(stepConf:Step) {
    // Aquí implementarías la lógica para guardar los cambios del step seleccionado
    this.stepService.updateStep(stepConf.id!,stepConf).subscribe(
      reponse =>{
        this.toastr.success("Actualizado correctamente")
        console.log(this.calculateProjectProgress(this.steps))
      },
      error=>{
        this.toastr.success("Ocurrió un error", error)
      }
    )

    console.log('Guardando cambios:', this.stepOnConfig);
    this.closeModal(); // Cerrar el modal después de guardar
  }


// Enviar el formulario para crear un nuevo step
  submitStep() {
    // Aquí formateamos la fecha a la representación en formato ISO
    const now = new Date();
    const formattedDate = now.toISOString(); // "YYYY-MM-DDTHH:mm:ssZ"
    this.newStep.projectTaskId = parseInt(this.actualTask.id);
    if (!this.newStep.lastRun) {
      this.newStep.lastRun=formattedDate; // Usar la fecha formateada
    }

    this.stepService.createStep(this.newStep).subscribe(response => {
      this.toastr.success('Step creado exitosamente')
      console.log('Step creado exitosamente:', response);
      this.newStep = new Step('','','')
      this.stepService.getStepsByTaskId(this.currenTaskId)
      this.closeModal();
    }, error => {
      this.toastr.error('Error al crear el step')
      console.error('Error al crear el step:', error);
    });
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
    if(step.command!=null && step.command!=undefined){
      this.stepOnExecution= step;
      this.toastr.info(`Ejecutando: ${step.command}`, 'Ejecutando');
      step.status = 'in-progress';

      this.saveChanges(this.stepOnExecution)
      this.command=step.command;
    }else{
      this.toastr.info("Realizando avance del proyeto(Sin comandos)");
      step.status = 'in-progress';
    }

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
/*   addComment(pipelineId: number) {
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
  } */
   // Función para añadir comentario
  addComment(pipelineId: number) {
    if (this.newComment.trim()) {
      const newCommentary = new Commentary(
   
        'Current User', // Aquí puedes usar el nombre de usuario o el objeto User si tienes más información
        this.newComment, // El mensaje del comentario
        new Date(), // Fecha actual
        pipelineId,
        this.currentUserId // El ID del usuario actual
      );

      this.commentaryService.createCommentary(newCommentary).subscribe(
        (commentary: Commentary) => {
          this.toastr.success('Comentario añadido exitosamente');
          this.filteredComments.push(commentary); // Añadir el comentario a la lista local
          this.newComment = ''; // Limpiar el campo de comentario
        },
        (error) => {
          console.error('Error al añadir el comentario:', error);
          this.toastr.error('Error al añadir el comentario');
        }
      );
    }
  }
/*   filterComments() {
    if (this.selectedPipeline) {
      this.filteredComments = this.comments.filter(c => c.stepId === this.selectedPipeline!.id);
    } else {
      this.filteredComments = [];
    }
  }
 */
  getCommentariesByStepid(pipeline: Step){
    this.commentaryService.getCommentariesByStep(pipeline.id!).subscribe((res:any)=>{
      this.filteredComments = res;
    })
  }

  closeDiscussion(){
    this.selectedPipeline = null;
  }


  selectPipeline(pipeline: Step) {
    this.selectedPipeline = pipeline;
    this.getCommentariesByStepid(pipeline);
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
          this.saveChanges(this.stepOnExecution)
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

  calculateProjectProgress(steps: Step[]): number {
    const totalSteps = steps.length;
    if (totalSteps === 0) return 0.00; // Si no hay steps, el avance es 0

    let totalPercentage = 0;

    steps.forEach(step => {
        if (step.status === 'pending') {
            totalPercentage += 0; // 0%
        } else if (step.status === 'in-progress') {
            totalPercentage += 50; // 50%
        } else if (step.status === 'completed') {
            totalPercentage += 100; // 100%
        }
    });


    const averagePercentage = totalPercentage / totalSteps;
    this.actualTask.progress = Math.round(averagePercentage);
    console.log(this.actualTask.progress)
    this.taskService.updateProjectTask(this.actualTask.id,this.actualTask).subscribe(
      (response: any) => {
        this.toastr.success("Progreso de Tarea modificado: "+ this.actualTask.progress+'%')
      }
    )

    // Calcular el porcentaje promedio
    return Math.round(averagePercentage);;
  }
}




