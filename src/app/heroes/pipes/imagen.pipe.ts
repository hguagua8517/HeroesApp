import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroes: Heroes): string {
    return `assets/heroes/${heroes.id}.jpg`;
  }

}
