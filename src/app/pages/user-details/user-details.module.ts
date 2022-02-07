import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsRoutingModule } from './user-details-routing.module';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Components
import { UserDetailsComponent } from './user-details.component';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class UserDetailsModule { }
