import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../../models/Candidate';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.scss']
})
export class EditCandidateComponent implements OnInit {
  public idCandidate: number;
  public candidate;
  myform!: FormGroup;
  submitted = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.myform = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        poste: ['', Validators.required],
        activity: ['', Validators.required],
        gender: ['', Validators.required],
        address: [''],
        phone: ['', [Validators.minLength(10)]],
        dateOfBirth: ['']
      });
  }
  // , Validators.maxLength(10)
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idCandidate = parseInt(params.get('id'));
    });
    if (isNaN(this.idCandidate) || this.idCandidate === undefined) {
      this.errorMessage = "id given is not valid";
    }
    else {
      this.adminService.getCandidate(this.idCandidate).subscribe(
        data => {

          this.candidate = data.data;
          this.myform.setValue({
            firstname: this.candidate.firstname,
            lastname: this.candidate.lastname,
            username: this.candidate.username,
            email: this.candidate.email,
            poste: this.candidate.poste,
            activity: this.candidate.activityArea,
            gender: this.candidate.gender ?? '',
            address: this.candidate.address ?? '',
            dateOfBirth: this.candidate.dateOfBirth ?? '',
            phone: this.candidate.phone ?? '',
          })

        },
        (err) => {
          this.errorMessage = err.error.message;

        }
      );

    }
  }
  public get Email(): FormControl {
    return this.myform.get('email') as FormControl;
  }
  public get Username(): FormControl {
    return this.myform.get('username') as FormControl;
  }
  public get Poste(): FormControl {
    return this.myform.get('poste') as FormControl;
  }
  public get Activity(): FormControl {
    return this.myform.get('activity') as FormControl;
  }
  public get Gender(): FormControl {
    return this.myform.get('gender') as FormControl;
  }
  public get Firstname(): FormControl {
    return this.myform.get('firstname') as FormControl;
  }
  public get Lastname(): FormControl {
    return this.myform.get('lastname') as FormControl;
  }
  public get Address(): FormControl {
    return this.myform.get('address') as FormControl;
  }
  public get DateOfBirth(): FormControl {
    return this.myform.get('dateOfBirth') as FormControl;
  }
  public get Phone(): FormControl {
    return this.myform.get('phone') as FormControl;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  save(): void {
    this.submitted = true

    if (this.myform.invalid) {
      return;
    }

    this.candidate = {
      firstname: this.Firstname?.value.trim().toLowerCase(),
      lastname: this.Lastname?.value.trim().toLowerCase(),
      username: this.Username?.value.trim().toLowerCase(),
      email: this.Email?.value.trim().toLowerCase(),
      poste: this.Poste?.value.trim(),
      activityArea: this.Activity?.value.trim(),
      gender: this.Gender?.value.trim(),
      address: this.Address?.value.trim(),
      phone: this.Phone?.value.trim(),
      dateOfBirth: this.DateOfBirth?.value.trim()
    };

    this.adminService.updateCandidate(this.idCandidate, this.candidate).subscribe(

      (data) => {
        this.router.navigate(['/admin/candidates']);
        Swal.fire({
          title: 'Candidate Updated successfully',
          icon: 'success'
        })
      },
      (err) => {
        this.errorMessage = err.error.message;

      }
    );







  }
}

