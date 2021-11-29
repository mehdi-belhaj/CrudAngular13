import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Role, Utilisateur } from '../../../models/Utilisateur';
import { AuthHttpService } from '../services/auth-http.service';
import Validation from './Utils/validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authhttp: AuthHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }
  public get Email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  public get Username(): FormControl {
    return this.form.get('username') as FormControl;
  }
  public get Firstname(): FormControl {
    return this.form.get('firstname') as FormControl;
  }
  public get Lastname(): FormControl {
    return this.form.get('lastname') as FormControl;
  }
  public get Password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  public get confirmPassword(): FormControl {
    return this.form.get('cPassconfirmPasswordword') as FormControl;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let user: Utilisateur = {
      firstname: this.Firstname?.value.trim().toLowerCase(),
      lastname: this.Lastname?.value.trim().toLowerCase(),
      username: this.Username?.value.trim().toLowerCase(),
      email: this.Email?.value.trim().toLowerCase(),
      password: this.Password?.value,
      confirmedPassword: this.Password?.value,
      role: Role.ROLE_ADMIN,
    };
    this.authhttp.createUser(user).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/auth']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
