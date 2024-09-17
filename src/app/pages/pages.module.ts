import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user-management/user.component';
import { RouterModule } from '@angular/router';
import { PageRoutingModule } from './page-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule, PageRoutingModule],
})
export class PagesModule {}
