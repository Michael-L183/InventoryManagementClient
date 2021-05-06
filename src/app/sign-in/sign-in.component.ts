import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared-service/http.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
export interface IUser {
  id?: number;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: IUser = { email: null, password: null };
  currentUser = {};
  loggedIn = false;
  constructor(
    private http: HttpService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('id_token');
    if (token != null) {
      this.loggedIn = true;
      this.router.navigate(['']);
    } else {
      this.loggedIn = false;
    }
  }

  async login(user: IUser) {
    const resp: any = await this.http.post('user/login', user);
    if (resp && resp.token) {
      localStorage.setItem('id_token', resp.token);
      this.toastService.showToast('success', 3000, 'Login Success.');
      this.router.navigate(['']);
    } else {
      this.toastService.showToast('danger', 3000, 'Login Failed.');
    }
  }
}
