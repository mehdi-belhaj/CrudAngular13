import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../authentication/services/token-storage-service.service";
import {AuthHttpService} from "../../authentication/services/auth-http.service";
import {Admin} from "../../../models/Admin";
import {Router} from "@angular/router";
import {concatMap, pipe, retry, startWith, Subject, switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  doctorForm: FormGroup;
  doctors: any;
  public admin: any;
  constructor( private fb: FormBuilder,
              private tokenStorageService:TokenStorageService,
               private authService: AuthHttpService,
               private router: Router,
               private snackBar: MatSnackBar) {
  }
  // Form 1
  register: FormGroup;
  hide = true;
  adminn: Admin;
  updated: boolean = false;

  initForm() {
    this.register = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      lastname: [""],
      username: ["", [Validators.required]],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      address: [""],
      mobile: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required]],
      gender: ["", [Validators.required]],
    });
  }


  onRegister() {
    console.log("Form Value", this.register.value);
  }


  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };




  ngOnInit(): void {
    this.initForm();
      this.tokenStorageService.getToken();
      console.log(this.tokenStorageService.getToken());
    console.log("USER : ", this.tokenStorageService.getUser().username);
      this.admin = this.tokenStorageService.getUser();

    }




  confirmAdd() {

  }
  submit() {
    // emppty stuff
  }


  private readonly postAction$ = new Subject();

  posts$ = this.authService.postAction$.pipe(
    startWith(''),
    switchMap(() => {
      return this.authService.updateProfileAdmin(this.adminn);
    })
  )

  profilUpdated(admin: any) {
     console.log("admin updated : ", admin);
     console.log("form : ", this.register.value)
    this.authService.updateProfileAdmin(admin).subscribe(
      data => {
        this.adminn = data;
        this.tokenStorageService.userAdmin = data;
        console.log(this.register.value.admin)
        this.updated = true;
        console.log("Updated",this.tokenStorageService.userAdmin)
        /* this.admin = this.authService.UsernameExist(this.tokenStorageService.getUser().username).subscribe(
          data => this.admin = data
        );*/
        this.showNotification(
          ['snackbar-success'],
          "Admin Profile Updated Successfully...!!!",
          "top",
          "right"
        );
        this.router.navigate(['adminProfile']);

      }
    ),pipe(
      startWith(''),
      switchMap(() => {
        return this.authService.updateProfileAdmin(this.tokenStorageService.userAdmin);
      })
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
}
