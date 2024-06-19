import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  currentPath: string = '';
  inputPath: string = '';
  filesAndFolders: { name: string, isFile: boolean }[] = [];
  fileContent: string = '';

  constructor() { }

  ngOnInit(): void {
    // Inicialmente no leeremos ningún directorio
  }

/*   async readDirectory(dirPath: string) {
    try {
      this.currentPath = dirPath;
      const entries = await (window as any).electronAPI.readDirectory(dirPath);
      console.log(entries)
      
      // Mapea las entradas adecuadamente
      this.filesAndFolders = entries.map((entry:any) => ({
        name: entry.name,
        isFile: entry.isFile ? entry.isFile() : false
      }));
    } catch (error) {
      console.error('Error al leer el directorio:', error);
      // Manejar el error de acuerdo a tus necesidades
    }
  } */
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
    const fullPath = `${this.currentPath}/${entry.name}`;
    if (entry.isFile) {
      this.readFile(fullPath);
    } else {
      this.readDirectory(fullPath);
    }
  }

  onPathSubmit() {
    this.readDirectory(this.inputPath);
  }
}