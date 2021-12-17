import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private candidateService : CandidateService,private formBuilder: FormBuilder,
    private router: Router) { }

  candidat: any;
  id : number;

  ngOnInit(): void {
    this.getCandidat();



    this.myform = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        poste: ['FULLSTACKDEVELOPER', Validators.required],
        activity: ['FINANCIALSERVICES', Validators.required],
        gender: ['MALE', Validators.required],

        lastname: ['', Validators.required],
       
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
  public get Password(): FormControl {
    return this.myform.get('password') as FormControl;
  }
  public get Phone(): FormControl {
    return this.myform.get('phone') as FormControl;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }



  
  getCandidat(): void {
    this.candidateService.getCandidateById()
      .subscribe(
        data => { this.candidat = data
          this.id = data.id
         
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  submit(){


    let candidate: Candidate = {
      firstname: this.Firstname?.value.trim().toLowerCase(),
      lastname: this.Lastname?.value.trim().toLowerCase(),
      email: this.Email?.value.trim().toLowerCase(),
      address: this.Address?.value.trim().toLowerCase(),
      phone: this.Phone?.value.trim().toLowerCase(),
      poste: this.Poste?.value.trim(),
      activityArea: this.Activity?.value.trim(),
      gender: this.Gender?.value.trim(),
      password: this.Password?.value,
      role: Role.ROLE_CANDIDAT,
    };

  
    this.candidateService.update(this.myform.value).subscribe(res => {
         console.log('Candidate updated successfully!');
         this.router.navigateByUrl('/dashboard');
    })
  }

}
