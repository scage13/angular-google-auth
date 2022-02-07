import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { User } from '../../shared/types/auth.type';
import { AuthState } from '../../store/auth/auth.state';
import { GoogleLogoutAction } from '../../store/auth/auth.actions';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent {

  @Select(AuthState.user) user$: Observable<User>;

  constructor(
    private store: Store,
  ) { }

  signOut(): void {
    this.store.dispatch(new GoogleLogoutAction());
  }

}
