import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageColorService {

  constructor() { }

  private languageColors: { [key: string]: string } = {
    'Angular': 'red-500',
    'HTML': 'amber-500',
    'CSS': 'blue-500',
    'Node.js': 'green-500',
    'Spring Boot': 'green-600',
    'TypeScript': 'blue-400',
    'Vue': 'green-400',
    'C-sharp': 'pink-500'
  };

  getColor(language: string): string {
    return this.languageColors[language] || 'gray-500';
  }
}
