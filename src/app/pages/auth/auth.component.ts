import { Component } from '@angular/core';
import { GoogleLoginAction } from '../../store/auth/auth.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {
  constructor(
    private store: Store,
  ) { }

  signIn(): void {
    this.store.dispatch(new GoogleLoginAction());
  }
}
