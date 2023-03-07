import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private autService: AuthService,
    private router: Router){}
  canActivate(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.autService.verificaAutenticacion()
    .pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado ) {
          this.router.navigate(['./auth/login']);
        }
      })
    )

    //if(this.autService.auth.id){
    // return true;
    //}
    //console.log('canload', true);
    //console.log(route);
    //console.log(segments);
    //console.log('Bloqueado por el AuthGuard - CanActivate')
  //return false;

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.autService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado ) {
            this.router.navigate(['./auth/login']);
          }
        })
      )
      //if(this.autService.auth.id){
        //return true;
      //}
      //console.log('canload', true);
      //console.log(route);
      //console.log(segments);
      //console.log('Bloqueado por el AuthGuard - CanLoad ')
    //return false;
  }
}
