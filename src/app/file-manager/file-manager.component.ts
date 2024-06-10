import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent implements OnInit {
  files: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadFiles('C:\Users\jorle\Desktop\Mi Primera Chamba\Intranet_OSCORP');  // Cambia esta ruta a la ruta de tu proyecto clonado
  }
  loadFiles(dir: string): void {
    //const fs = require('fs');
    
  }
/*   loadFiles(dir: string): void {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      this.files = files;
    });
  } */
}