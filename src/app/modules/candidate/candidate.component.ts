import { Component, OnInit } from '@angular/core';
import { CandidateService } from './candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  constructor(private candidateService : CandidateService) { }

  candidat: any;

  ngOnInit(): void {
    this.getCandidat();
  }


  getCandidat(): void {
    this.candidateService.getCandidateById()
      .subscribe(
        data => { this.candidat = data
         
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
