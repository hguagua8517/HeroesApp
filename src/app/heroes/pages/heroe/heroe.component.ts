import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { HeroesService } from './../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interface';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px;
  }
  `]
})
export class HeroeComponent implements OnInit{

  heroes!: Heroes;

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router){}

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(switchMap(({id}) => this.heroesService.getHeroesPorId(id) ) )
    .subscribe( heroes => this.heroes = heroes);

  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}