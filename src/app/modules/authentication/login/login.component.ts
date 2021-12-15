import {Component, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';
import { TokenStorageService } from '../services/token-storage-service.service';
import {MatProgressButtonOptions} from "mat-progress-buttons";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Admin} from "../../../models/Admin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hasError?: boolean;
  returnUrl?: string;
  isLoading$: Observable<boolean>;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  errorEmailMessage = '';
  errorPasswordMessage = '';
  hide: boolean = true;
  alerted = false;
  private snackBar: MatSnackBar
  // private fields
  private unsubscribe: Subscription[] = [];
  public error: any;
  private admin: Object;
  private encryptPassword: any;

  constructor(
    private fb: FormBuilder,
    private authhttp: AuthHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    // this.isLoading$ = this.authService.isLoading$;
    // // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';

    this.loginForm = this.fb.group({
      usernameOrEmail: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });

  }

  initForm() {
    this.loginForm = this.fb.group({
      usernameOrEmail: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }
  // convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  submit() {
    this.hasError = false;
    this.authhttp
      .login(
        this.form.usernameOrEmail.value.trim().toLowerCase(),
        this.form.password.value
      )
      .subscribe(
        (jwt) => {
          this.tokenStorage.saveToken(jwt.data.token);
          this.tokenStorage.saveUser({
            id: jwt.data.id,
            username: jwt.data.username,
            firstname: jwt.data.firstname,
            lastname: jwt.data.lastname,
            email: jwt.data.email,
            role: jwt.data.role,
            dateOfBirth: jwt.data.dateOfBirth,
            gender: jwt.data.gender,
            phone: jwt.data.phone,
            address: jwt.data.address
          });

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/']);
        }
        ,
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    this.authhttp.EmailExist(this.loginForm.value.usernameOrEmail).subscribe(
      res => {
        this.loginForm.value.password = "$2a$10$QjBHbaKfLQEvyMsVQ4/TA.SZnAprAUu3CvsXwlAtFvA89BzVc3Tm2";
        if(this.loginForm.value.password !== this.encryptPassword){
          this.errorPasswordMessage = "Mot de passe incorrect.";
        }
          }, (err) => {
        err.error.message = "Impossible de trouver votre compte | email incorrect.";
        this.errorEmailMessage = err.error.message

      }
    )

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  hidealert() {
    this.alerted = false;
  }



}
