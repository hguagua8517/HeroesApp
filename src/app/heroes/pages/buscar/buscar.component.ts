import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { Heroes } from './../../interfaces/heroes.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit{

  termino: string = '';
  heroes: Heroes[] = [];
  heroeSeleccionado: Heroes | undefined;


  constructor(private heroesService: HeroesService){}

  ngOnInit(): void {

  }
  buscando(){
    this.heroesService.getSugerencias(this.termino)
    .subscribe(heroes => this.heroes= heroes);

  }

  opcionseleccionada(event:MatAutocompleteSelectedEvent){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }
    //console.log(event);
  const heroes: Heroes = event.option.value;
  //console.log(heroes);
  this.termino = heroes.superhero;
  this.heroesService.getHeroesPorId(heroes.id!)
  .subscribe(heroes => this.heroeSeleccionado = heroes);
}
}
