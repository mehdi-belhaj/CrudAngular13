import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-import-candidate',
  templateUrl: './import-candidate.component.html',
  styleUrls: ['./import-candidate.component.scss']
})
export class ImportCandidateComponent implements OnInit {
  fileToUpload: File | null = null;
  errors: boolean = false;
  constructor(private adminService: AdminService,
              private snackBar: MatSnackBar,
              private route: Router) { }

  ngOnInit(): void {
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
    this.adminService.postFile(this.fileToUpload).subscribe(
      data => {
        console.log(data.message);
        this.route.navigate(['/admin/candidates'])
      },
      err => console.log(err.error.message)
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
