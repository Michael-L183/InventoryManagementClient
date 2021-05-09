import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../shared-service/http.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: object;

  constructor(
    private http: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.user = {};
  }

  async createUser(user: any) {
    const resp = await this.http.post('user', user);
    return user || null;
  }

  async addUser(user: object) {
    const resp = await this.createUser(user);
    if (resp) {
      this.router.navigate(['/users']);
    }
  }
}
