import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Components
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }
