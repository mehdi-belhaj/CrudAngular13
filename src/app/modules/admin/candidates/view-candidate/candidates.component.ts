import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AdminService } from '../../admin.service';

@Component({ selector: 'app-candidates', templateUrl: './candidates.component.html', styleUrls: ['./candidates.component.scss'] })
export class CandidatesComponent implements OnInit,
  AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'username',
    'email',
    'poste',
    'activityArea',
    'actions',
  ];
  public table = new MatTableDataSource<any>();
  activityArea: string = '';
  listCandidates;
  fileToUpload: File | null = null;
  errors: boolean = false;
  constructor(private adminService: AdminService) { }
  ngOnInit(): void {
    this.adminService.getCandidates().subscribe((data) => {
      this.setTableDataSource(data.data);
    });
  }
  ngAfterViewInit(): void {
    this.table.paginator = this.matPaginator;
  }
  setTableDataSource(data: any) {
    this.table = new MatTableDataSource<any>(data);
    this.listCandidates = this.table.data;
    this.table.paginator = this.matPaginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }

  filterbyActivityArea() {
    this.table.data = this.listCandidates;
    if (this.activityArea === '') {
      this.table.data = this.listCandidates;
    } else {
      this.table.data = this.table.data.filter((item) => item.activityArea === this.activityArea);
    }
  }
  deleteCandidate(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this candidate!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteCandidate(id).subscribe(data => {
          this.table.data = this.table.data.filter((item) => item.id !== id);
          this.listCandidates = this.table.data;
        })
        Swal.fire('Deleted!', 'Your candidate has been deleted.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your candidate is safe :)', 'error')
      }
    })

  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload = files.item(0);
    this.adminService.postFile(this.fileToUpload).subscribe(
      data => {
        console.log(data.message);
      },
      err => console.log(err.error.message)
    );



  }
}
