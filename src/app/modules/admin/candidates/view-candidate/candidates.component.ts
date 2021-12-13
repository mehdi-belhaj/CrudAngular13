import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityArea, Candidate, Poste } from '../../../../models/Candidate';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'username',
    'email',
    'poste',
    'activityArea',
    'actions',
  ];
  public table = new MatTableDataSource<any>();
  public candidates;
  activityArea: string = '';
  listCandidates;
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.adminService.getCandidates().subscribe((data) => {
      this.candidates = data.data;
      this.setTableDataSource(data.data);
      this.listCandidates = this.table.data;
    });
  }
  ngAfterViewInit(): void {
    this.table.paginator = this.matPaginator;
  }
  setTableDataSource(data: any) {
    this.table = new MatTableDataSource<any>(data);
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
      this.table.data = this.table.data.filter(
        (item) => item.activityArea === this.activityArea
      );
    }
  }
}
