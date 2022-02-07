import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxsOnInit, State, Action, StateContext, Selector } from '@ngxs/store';

// Actions
import { GoogleLoginAction, GoogleLogoutAction } from './auth.actions';

// Types
import { AuthStateModel, User } from '../../shared/types/auth.type';

// Consts
import { STORAGE_PROFILE_KEY } from '../../shared/consts/consts';

// Services
import { VaultService } from '../../shared/services/vault.service';
import { AuthService } from '../../shared/services/auth.service';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
  },
})
@Injectable()
export class AuthState implements NgxsOnInit {

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user;
  }

  constructor(
    private vaultService: VaultService,
    private authService: AuthService,
  ) {}

  ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
    this.authService.initGAuth();
    const profile: User = this.vaultService.get(STORAGE_PROFILE_KEY);
    const isExpired = profile?.authData?.expires_at < Date.now();

    if (!!profile && !isExpired) {
      ctx.setState({ user: profile });
    }
  }

  @Action(GoogleLoginAction)
  googleLogin(ctx: StateContext<AuthStateModel>): Observable<User> {
    return this.authService.googleSignIn().pipe(
      tap((user: User) => {
        ctx.patchState({ user });
      })
    );
  }

  @Action(GoogleLogoutAction)
  googleLogout(ctx: StateContext<AuthStateModel>): Observable<unknown> {
    return this.authService.googleSignOut().pipe(
      tap(() => {
        ctx.patchState({ user: null });
      })
    );
  }

}
