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
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from 'sweetalert2';
import { Admin } from "../../../models/Admin";
import { BehaviorSubject } from "rxjs";

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
  hide: boolean = true;
  chide: boolean = true;

  private admins: Admin[];
  usernameExist: boolean = false;
  emailExist: boolean = false;
  messageValidate = {
    username: {
      required: 'Must Enter username',
      matchUsername: '',
    },
    email: {
      required: 'Must Enter username',
      matchEmail: '',
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private authhttp: AuthHttpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstname: ['', [
          Validators.required,
          Validators.minLength(4)]],
        lastname: ['', [
          Validators.required,
          Validators.minLength(4)]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password:
          ['',
            [
              Validators.required,
              Validators.minLength(6)]
          ],

        confirmPassword: ['', [
          Validators.required]],
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
    return this.form.get('confirmPassword') as FormControl;
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
        Swal.fire({
          title: 'Admin Created successfully',
          icon: 'success'
        })
      }
      ,
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }

    );



  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: ['snackbar-success'],
    });
  }

  isUserNameExist() {
    const name = this.form.value.username;
    if (name != null && name != '') {
      this.authhttp.UsernameExist(name).subscribe(x => {
        console.log('name exist')
        this.messageValidate.username.matchUsername = 'Username Already Exists.';
        this.usernameExist = true;
      }, ex => {
        this.usernameExist = false;
        console.log(ex);
      });
      return true;
    }
    return false;
  }

  isEmailExist() {
    const email = this.form.value.email;
    if (email != null && email != '') {
      this.authhttp.EmailExist(email).subscribe(x => {
        console.log('email exist')
        this.messageValidate.email.matchEmail = 'Email Already Exists.';
        this.emailExist = true;
      }, ex => {
        this.emailExist = false;
        console.log(ex);
      });
      return true;
    }
    return false;
  }


}
