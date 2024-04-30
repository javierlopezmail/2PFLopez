import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    if (!value) {
      return '';
    }
    
    const nombre = value.nombre || '';
    const apellido = value.apellido || '';
    return `${nombre} ${apellido}`.trim();
  }
}