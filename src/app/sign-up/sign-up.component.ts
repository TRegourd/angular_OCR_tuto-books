import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private authServices: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }

  onSubmit(): void {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    this.authServices.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }
}
