import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroesService } from './../../services/heroes.service';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }
  `]
})
export class AgregarComponent implements OnInit{
  [x: string]: any;

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }
  constructor(private heroesService: HeroesService,
    private activadedRoute: ActivatedRoute,
    private router: Router, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit(): void {
     if(!this.router.url.includes('editar')){
      return;
     }
      this.activadedRoute.params.pipe(switchMap( ({id}) => this.heroesService.getHeroesPorId(id)))
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar() {
    //console.log(this.heroe);
    if(this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id){
      //actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => this.mostrarSnackbar('Registro Actualizado'));
    }else{
      //editar
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar('Registro Creado');
         //resp => {console.log('respueta', resp);
      })
    }

  }

  eliminar(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe((result) => {
        if (result){
          this.heroesService.eliminarHeroe(this.heroe.id!)
          .subscribe(resp => {
          this.router.navigate(['/heroes']);
        });
        }
      });
    
      
  }

  mostrarSnackbar(mensaje: string){
  this.snackBar.open(mensaje, 'ok', {
    duration: 2500  })
  }

}
