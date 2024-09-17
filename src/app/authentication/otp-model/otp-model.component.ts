import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../core/services/token.service';
import { HttpClient } from '@angular/common/http';
import { CustomJwtPayload } from '../../core/models/interfaces/CustomJwtPayload';

@Component({
  selector: 'app-otp-model',
  templateUrl: './otp-model.component.html',
  styleUrls: ['./otp-model.component.css'],
})
export class OtpModelComponent {
  otpForm: FormGroup = new FormGroup({
    otpInput1: new FormControl('', [Validators.required]),
    otpInput2: new FormControl('', [Validators.required]),
    otpInput3: new FormControl('', [Validators.required]),
    otpInput4: new FormControl('', [Validators.required]),
    otpInput5: new FormControl('', [Validators.required]),
    otpInput6: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  get otpNumberToCheck(): string {
    return (
      this.otpForm.get('otpInput1')?.value +
      this.otpForm.get('otpInput2')?.value +
      this.otpForm.get('otpInput3')?.value +
      this.otpForm.get('otpInput4')?.value +
      this.otpForm.get('otpInput5')?.value +
      this.otpForm.get('otpInput6')?.value
    );
  }

  onSubmit() {
    if (this.otpForm.valid) {
      const otpCode = Number(this.otpNumberToCheck);
      this.authService.otpVerify({ otp: otpCode }).subscribe(
        (response) => {
          this.otpForm.reset();
          this.tokenService.addToken(response.data.accessToken);
          this.tokenService.getUserRole();
          this.authService.setLoggedIn(true);
          this.toast.success(`Welcome ${response.data.user.name}`);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.toast.error(error.error.message);
        }
      );
    }
  }

  onInput(
    event: Event,
    currentInput: HTMLInputElement,
    nextInput: HTMLInputElement | null
  ) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length >= 1 && nextInput) {
      nextInput.focus();
    }
  }

  resetForm() {
    this.otpForm.reset();
  }

  onBackspace(
    event: Event,
    currentInput: HTMLInputElement,
    previousInput: HTMLInputElement | null
  ) {
    const keyboardEvent = event as KeyboardEvent;
    if (
      keyboardEvent.key === 'Backspace' &&
      currentInput.value.length === 0 &&
      previousInput
    ) {
      previousInput.focus();
    }
  }
}
