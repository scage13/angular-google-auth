import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { GoogleAuthBase, User } from '../types/auth.type';

// Consts
import { STORAGE_PROFILE_KEY } from '../consts/consts';
import { environment } from '../../../environments/environment';

// Utils
import { mapUserResponse } from '../utils/utils';

// Services
import { VaultService } from './vault.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth2 = new BehaviorSubject<GoogleAuthBase | null>(null);
  auth2$ = this.auth2.asObservable().pipe(
    filter(data => !!data),
  );

  constructor(
    private vaultService: VaultService,
    private router: Router,
  ) {}

  initGAuth(): void {
    gapi.load('auth2', () => {
      this.auth2.next(
        gapi.auth2.init({ client_id: environment.gAuthClienId }),
      );
    });
  }

  googleSignIn(): Observable<User> {
    return this.auth2$.pipe(
      switchMap((gauth: GoogleAuthBase) => gauth.signIn()),
      map(mapUserResponse),
      tap((user: User) => {
        this.vaultService.set(STORAGE_PROFILE_KEY, user);
        this.router.navigate(['/user-details']);
      }),
    );
  }

  googleSignOut(): Observable<unknown> {
    return this.auth2$.pipe(
      switchMap((gauth: GoogleAuthBase) => gauth.signOut()),
      tap(() => {
        this.vaultService.remove(STORAGE_PROFILE_KEY);
        this.router.navigate(['/']);
      }),
    );
  }
}
