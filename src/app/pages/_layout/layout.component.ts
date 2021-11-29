import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { AuthHttpService } from '../../modules/authentication/services/auth-http.service';
import { TokenStorageService } from '../../modules/authentication/services/token-storage-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public role;
  constructor(
    private tokenService: TokenStorageService,
    private httpservice: AuthHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = this.tokenService.getUser().role;
  }
  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/auth']);
  }
}
