import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../models/Candidate';
import { Role } from '../../models/Utilisateur';
import { CandidateService } from './candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  myform!: FormGroup;
  submitted = false;
  errorMessage = '';
  public image;
  constructor(private candidateService: CandidateService, private formBuilder: FormBuilder,
    private router: Router) { }

  candidat: any;
  id: number;

  ngOnInit(): void {
    this.getCandidat();



    this.myform = this.formBuilder.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        poste: ['FULLSTACKDEVELOPER', Validators.required],
        activity: ['FINANCIALSERVICES', Validators.required],
        gender: ['MALE', Validators.required],

        lastname: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        address: ['', [Validators.required]],
        dateOfBirth: ['', Validators.required]

      },

    );
  }



  public get Email(): FormControl {
    return this.myform.get('email') as FormControl;
  }
  public get Address(): FormControl {
    return this.myform.get('address') as FormControl;
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
  public get Phone(): FormControl {
    return this.myform.get('phone') as FormControl;
  }
  public get DateOfBirth(): FormControl {
    return this.myform.get('dateOfBirth') as FormControl;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }




  getCandidat(): void {
    this.candidateService.getCandidateById()
      .subscribe(
        data => {
          this.candidat = data;
          this.myform.setValue({
            firstname: this.candidat.firstname,
            poste: this.candidat.poste,
            activity: this.candidat.activityArea,
            gender: this.candidat.gender,

            lastname: this.candidat.lastname,
            phone: this.candidat.phone,
            address: this.candidat.address,
            dateOfBirth: this.candidat.dateOfBirth
          });
          this.image = this.candidat?.gender == 'MALE' ? '../../../../assets/img/avatar.png' : '../../../../assets/img/avatar2.png'
        },
        error => {
          Swal.fire({
            text: 'error',
            icon: "error"
          })
        });
  }


  submit() {


    let candidate: any = {
      firstname: this.Firstname?.value.trim().toLowerCase(),
      lastname: this.Lastname?.value.trim().toLowerCase(),
      address: this.Address?.value.trim().toLowerCase(),
      phone: this.Phone?.value.trim().toLowerCase(),
      gender: this.Gender?.value.trim(),
      dateOfBirth: this.DateOfBirth?.value,
      role: Role.ROLE_CANDIDAT,
    };


    this.candidateService.update(this.myform.value).subscribe(res => {
      this.router.navigateByUrl('/dashboard');
      this.candidat = res["data"];
      //  this.candidat.lastname=res["data.lastname"];
      //  this.candidat.firstname=res["data.first"];
      //  this.candidat.firstname=res["data.first"];
      //  this.candidat.firstname=res["data.first"];
      Swal.fire({
        text: 'Your personal information updated succeftully',
        icon: "success"
      })
    },
      err => Swal.fire({
        text: 'Form invalid',
        icon: "error"
      })
    )
  }

}
