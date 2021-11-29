import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';
import { TokenStorageService } from '../services/token-storage-service.service';

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
  // private fields
  private unsubscribe: Subscription[] = [];

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
  }

  initForm() {
    this.loginForm = this.fb.group({
      usernameOrEmail: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)]),
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
            email: jwt.data.email,
            role: jwt.data.role,
          });

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/']);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }
}
