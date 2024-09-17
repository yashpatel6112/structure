import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { OtpModelComponent } from './authentication/otp-model/otp-model.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutsComponent } from './layouts/layouts.component';
import { LayoutsModule } from './layouts/layouts.module';
import { tokenInterceptor } from './core/interceptor/token.interceptor';
import { AgGridAngular } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OtpModelComponent,
    LayoutsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LayoutsModule,
    AgGridAngular
  ],
  providers: [provideClientHydration(), provideHttpClient(withInterceptors([
    tokenInterceptor
  ])),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
