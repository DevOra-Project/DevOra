import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';



@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    
  ],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.scss'
})
export class FileExplorerComponent implements OnInit {
  inputPath: string = '';
  currentPath: string = '';
  filesAndFolders: { name: string, isFile: boolean }[] = [];
  fileContent: string = '';

  constructor(private cdr: ChangeDetectorRef) { 
    (window as any).electronAPI.onSelectFolderResponse((event: any, folderPath: string) => {
      if (folderPath) {
        this.inputPath = folderPath;
        this.currentPath = folderPath;
        console.log('Carpeta seleccionada:', folderPath);
        this.cdr.detectChanges(); // Fuerza la detección de cambios
        this.readDirectory(this.inputPath)
      } else {
        console.error('Selección de carpeta cancelada');
      }
    });
  }

  ngOnInit(): void {
    // Inicialmente no leeremos ningún directorio
  }
  openDirectory(){
    console.log('entra');
    (window as any).electronAPI.selectFolder();
    console.log('entra');
  }

  async readDirectory(dirPath: string) {
      try {
        this.currentPath = dirPath;
        const entries: { name: string, parentPath: string, path: string }[] = await (window as any).electronAPI.readDirectory(dirPath);
    
        // Mapear las entradas adecuadamente
        this.filesAndFolders = entries.map(entry => ({
          name: entry.name,
          isFile: entry.name.includes('.') || entry.name === 'node_modules' // Ejemplo: si tiene extensión o es 'node_modules' se asume que es un archivo
        }));
      } catch (error) {
        console.error('Error al leer el directorio:', error);
        // Manejar el error de acuerdo a tus necesidades
      }
    }
    

  async readFile(filePath: string) {
    try {
      this.fileContent = await (window as any).electronAPI.readFile(filePath);
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      // Manejar el error de acuerdo a tus necesidades
    }
  }


  onEntryClick(entry: { name: string, isFile: boolean }) {
    const fullPath = this.currentPath+"\\"+entry.name;
  
    if (entry.isFile) {
      this.readFile(fullPath);
    } else {
      this.readDirectory(fullPath);
      this.currentPath = fullPath;
      console.log(this.currentPath)
    }
  }
  goUpDir(): void {
    const pathParts = this.currentPath.split('\\');
    if (pathParts.length > 1) {
      pathParts.pop();
      this.currentPath = pathParts.join('\\');
      //this.inputPath = this.currentPath; // Actualiza también el inputPath
      console.log(this.currentPath)
      this.readDirectory(this.currentPath); 
    }
  }
  
  onPathSubmit() {
    this.readDirectory(this.currentPath);
  }
}