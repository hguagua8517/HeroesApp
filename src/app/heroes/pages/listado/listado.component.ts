import { Heroes } from './../../interfaces/heroes.interface';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit{

  heroes: Heroes[] = [];

  constructor (private heroesService: HeroesService) {}

  ngOnInit(): void {

    this.heroesService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
    //.subscribe( console.log);
  }

}
