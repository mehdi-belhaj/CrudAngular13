import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AdminService } from '../../admin.service';

@Component({ selector: 'app-candidates', templateUrl: './candidates.component.html', styleUrls: ['./candidates.component.scss'] })
export class CandidatesComponent implements OnInit,
  AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
  constructor(private adminService: AdminService) { }
  ngOnInit(): void {
    this.adminService.getCandidates().subscribe((data) => {
     
      data.data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      this.setTableDataSource(data.data);
    });
  }
  ngAfterViewInit(): void {
    this.table.paginator = this.matPaginator;
    const sortState: Sort = { active: 'name', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
  setTableDataSource(data: any) {
    this.table = new MatTableDataSource<any>(data);
    this.listCandidates = this.table.data;
    this.table.paginator = this.matPaginator;
    this.table.sort = this.sort;
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
}
