import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TopbarComponent } from './topbar/topbar.component';



@NgModule({
  declarations: [
    AuthComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    TopbarComponent
  ]
})
export class LayoutsModule { }
