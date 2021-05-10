import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared-service/http.service';
import { ToastService } from '../toast/toast.service';
import { ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users = [];
  loggedIn = false;
  inventoryParams = '';

  constructor(
    private toastService: ToastService,
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    const token = localStorage.getItem('id_token');
    if (token == null) {
      this.loggedIn = false;
      this.router.navigate(['signIn']);
    } else {
      this.loggedIn = true;
    }
    await this.refresh();
  }

  async refresh() {
    this.users = await this.getUsers('user');
  }

  async getUsers(path: string) {
    const resp = await this.http.get(path);
    return resp;
  }

  async removeUser(user: any, index: number) {
    const resp = await this.http.delete(`user/id/${user.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'User Deletion Failed!');
    }
  }

  goToCreate() {
    this.router.navigate(['user-create']);
  }

}

