import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    emailOrUsername: new FormControl('', [
      Validators.required,
      this.emailOrUsernameValidator,
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.loginForm.reset();
          this.toast.success('Otp sent to your email successfully');
          this.router.navigate(['/auth/otp-verify']);
        },
        (error) => {
          this.toast.error(error.error.message);
        }
      );
    }
  }

  emailOrUsernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) {
      return null;
    }
    if (emailPattern.test(value) || /^[a-zA-Z0-9]+$/.test(value)) {
      return null;
    }
    return { emailOrUsername: true };
  }
}
