import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenStorageService } from "../../authentication/services/token-storage-service.service";
import { AuthHttpService } from "../../authentication/services/auth-http.service";
import { Admin } from "../../../models/Admin";
import { Router } from "@angular/router";
import { concatMap, pipe, retry, startWith, Subject, switchMap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Gender, Role } from "../../../models/Utilisateur";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  doctorForm: FormGroup;
  doctors: any;
  public admin: any;
  genders: string[] = ["MALE", "FEMALE"];
  genderForm: FormGroup;
  public image;
  constructor(private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private authService: AuthHttpService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }
  // Form 1
  register: FormGroup;
  hide = true;
  adminn: Admin;
  adminProfile: Admin;
  updated: boolean = false;

  initForm() {
    this.register = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      lastname: ["", Validators.required],
      address: [""],
      mobile: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      email: [""]
    });

  }


  onRegister(admin: any) {
    this.profilUpdated(admin);
  }


  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };




  ngOnInit(): void {


    this.initForm();
    this.tokenStorageService.getToken();
    this.admin = this.tokenStorageService.getUser();
    if(this.admin?.gender=="" || this.admin?.gender==undefined)
    this.admin.gender='MALE';
    this.image = this.admin?.gender == 'MALE' ? '../../../../assets/img/avatar.png' : '../../../../assets/img/avatar2.png'
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
    this.authService.updateProfileAdmin(admin).subscribe(
      data => {
        this.adminn = data;
        // this.tokenStorageService.getUser().admin = data;
        this.tokenStorageService.userAdmin = data;

        this.tokenStorageService.saveUser(this.tokenStorageService.userAdmin['data'])
        this.updated = true;
        // this.showNotification(
        //   ['snackbar-success'],
        //   "Admin Profile Updated Successfully...!!!",
        //   "bottom",
        //   "right"
        // );
        this.router.navigateByUrl('/adminProfile');
        Swal.fire({
          title: 'You personal information updated successfully',
          icon: 'success'
        })
      }
    ), pipe(
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
