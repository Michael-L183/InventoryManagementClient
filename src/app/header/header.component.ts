import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared-service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  async logout() {
    const resp = await this.http.logout();
    if (resp.statusCode === 200) {
      localStorage.removeItem('id_token');
      this.router.navigate(['signIn']);
    }
  }

}
