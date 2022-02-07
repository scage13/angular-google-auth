import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';

import { Select } from '@ngxs/store';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthState } from '../../store/auth/auth.state';
import { AuthService } from '../services/auth.service';
import { User } from '../types/auth.type';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {

  @Select(AuthState.user) user$: Observable<User>;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  private doCheck(): Observable<boolean> {
    return this
      .user$
      .pipe(
        switchMap((user: User) => {
          const isExpired = user?.authData?.expires_at < Date.now();

          if (!user) {
            this.router.navigate(['/']);
            return of(false);
          }

          if (isExpired) {
            return this.authService.googleSignOut().pipe(
              map(() => false),
            );
          }

          return of(!!user);
        }),
      );
  }

  canActivate(): Observable<boolean> {
    return this.doCheck();
  }

  canLoad(): Observable<boolean> {
    return this.doCheck();
  }

}
