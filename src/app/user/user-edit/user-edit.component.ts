import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../shared-service/http.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: object = {};
  constructor(
    private http: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const resp = await this.getUserById(this.activatedRoute.snapshot.params[`id`]);
    this.user = resp.data || [];
  }

  async getUserById(userID) {
    const resp = await this.http.get(`user/id/${userID}`);
    return resp || [];
  }

  async update(userID, user) {
    const resp = await this.http.put(`user/id/${userID}`, user);
    return resp;
  }

  async updateUser(user: any) {
    const userID = user.id;
    const resp = await this.update(userID, user);
    if (resp) {
      this.router.navigate(['users']);
    }
  }

}
