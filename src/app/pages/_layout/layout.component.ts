import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, filter, map, throwError } from 'rxjs';
import { AuthHttpService } from '../../modules/authentication/services/auth-http.service';
import { TokenStorageService } from '../../modules/authentication/services/token-storage-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public user;
  title;
  public image;
  constructor(
    private tokenService: TokenStorageService,
    private httpservice: AuthHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscribeRouterEvents();
    this.title = this.router.url.split('/').pop();

    switch (this.title) {
      case 'newCandidate':
        this.title = 'Add New Candidate';
        break;
      case 'candidates':
        this.title = 'View All Candidates';
        break;
      case 'importCandidate':
        this.title = 'Import New Candidates';
        break;
      case 'dashboard':
        this.title = 'Dashboard';
        break;
      case 'adminProfile':
        this.title = 'Admin Profile';
        break;
      default:
        this.title = "Update Candidate";
        break;
    }
    this.user = this.tokenService.getUser();
    this.image = this.user?.gender == 'MALE' ? '../../../../assets/img/avatar.png' : '../../../../assets/img/avatar2.png'
  }
  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/auth']);
  }
  subscribeRouterEvents = () => {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.title = this.router.url.split('/').pop();
        this.user = this.tokenService.getUser();
        this.image = this.user?.gender == 'MALE' ? '../../../../assets/img/avatar.png' : '../../../../assets/img/avatar2.png'
        switch (this.title) {
          case 'newCandidate':
            this.title = 'Add New Candidate';
            break;
          case 'candidates':
            this.title = 'View All Candidates';
            break;
          case 'importCandidate':
            this.title = 'Import New Candidates';
            break;
          case 'dashboard':
            this.title = 'Dashboard';
            break;
          case 'adminProfile':
            this.title = 'Admin Profile';
            break;
          default:
            this.title = "Update Candidate";
            break;
        }
      });
  };
}
