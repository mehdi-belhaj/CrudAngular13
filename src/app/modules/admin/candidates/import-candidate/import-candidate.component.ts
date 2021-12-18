import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-import-candidate',
  templateUrl: './import-candidate.component.html',
  styleUrls: ['./import-candidate.component.scss']
})
export class ImportCandidateComponent implements OnInit {

  fileToUpload: File | null = null;
  errors: boolean = false;
  disabled = true;
  constructor(private adminService: AdminService,
    private snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
    this.disabled = false;

  }
  upload() {
    if (this.fileToUpload && this.fileToUpload?.name.split('.').pop() == 'csv') {
      this.adminService.postFile(this.fileToUpload).subscribe(
        data => {
          this.route.navigate(['/admin/candidates']);
          Swal.fire({
            title: 'Candidates uploaded successfully',
            icon: 'success'
          })
        },
        err => Swal.fire({
          title: 'Email or Username of candidate already exist',
          icon: 'error'
        })
      );
    }
    else {
      Swal.fire({
        title: 'Please choose a csv file',
        icon: 'error'
      })
    }
  }

}
