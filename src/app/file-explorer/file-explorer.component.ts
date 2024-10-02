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
  devoraComments: string[] = [];  // Aquí se almacenarán los comentarios con el tag devora

  constructor(private cdr: ChangeDetectorRef) { 
  
  }

  ngOnInit(): void {
    // Inicialmente no leeremos ningún directorio
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
      this.extractDevoraComments(this.fileContent); // Extraer comentarios con devora
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      // Manejar el error de acuerdo a tus necesidades
    }
  }
  extractDevoraComments(content: string): void {
    const lines = content.split('\n');
    this.devoraComments = lines.filter(line => line.includes('//devora//')); // Filtra las líneas que contienen //devora//
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