import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../../models/Candidate';
import { Role } from '../../../../models/Utilisateur';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  myform!: FormGroup;
  submitted = false;
  errorMessage = '';



  constructor(
    private formBuilder: FormBuilder,
    private candidateService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.myform = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        poste: ['FULLSTACKDEVELOPER', Validators.required],
        activity: ['FINANCIALSERVICES', Validators.required],
        gender: ['MALE', Validators.required],

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
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
        ]

      },

    );
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
  public get Password(): FormControl {
    return this.myform.get('password') as FormControl;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  save(): void {
    this.submitted = true

    if (this.myform.invalid) {
      return;
    }

    let candidate: Candidate = {
      firstname: this.Firstname?.value.trim().toLowerCase(),
      lastname: this.Lastname?.value.trim().toLowerCase(),
      username: this.Username?.value.trim().toLowerCase(),
      email: this.Email?.value.trim().toLowerCase(),
      poste: this.Poste?.value.trim(),
      activityArea: this.Activity?.value.trim(),
      gender: this.Gender?.value.trim(),
      password: this.Password?.value,
      role: Role.ROLE_CANDIDAT,
    };
    this.candidateService.addCandidate(candidate).subscribe(

      (data) => {
        this.router.navigate(['/admin/candidates']);
        Swal.fire({
          title: 'Candidate Added successfully',
          icon: 'success'
        })
      },
      (err) => {
        this.errorMessage = err.error.message;

      }
    );







  }


}
