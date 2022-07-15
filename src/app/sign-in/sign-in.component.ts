import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
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
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    this.authServices.signInUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }
}
