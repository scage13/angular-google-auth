import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { GoogleLoginAction, GoogleLogoutAction } from '../../store/auth/auth.actions';
import { AuthState } from '../../store/auth/auth.state';
import { Observable } from 'rxjs';
import { User } from '../../shared/types/auth.type';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent {

  @Select(AuthState.user) user$: Observable<User>;

  constructor(
    private store: Store,
  ) { }

  signOut(): void {
    this.store.dispatch(new GoogleLogoutAction());
  }

}
