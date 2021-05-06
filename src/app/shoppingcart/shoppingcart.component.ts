import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../shared-service/http.service';
import { ToastService } from '../toast/toast.service';

interface IHome {
  id?: number;
  inventoryImage: string;
  inventoryName: string;
  inventoryModel: string;
  inventorySerial: string;
  inventoryPrice: string;
  inventoryQuantity: string;
}

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  shoppingcarts = [];
  homeCard: Array<IHome> = [];
  loggedIn = false;
  inventoryParams = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private toastService: ToastService) { }

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
    this.shoppingcarts = await this.getshoppingcart('shoppingcart');
  }

  async getshoppingcart(path: string) {
    const resp = await this.http.get(path);
    return resp;
  }

  async deletecartinventory(shoppingcart: any, index: number) {
    const resp = await this.http.delete(`ShoppingCart/id/${shoppingcart.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Remove from cart failed!');
    }
  }

  calculate() {
    const subTotal = this.shoppingcarts.reduce((inc, item, i, arc) => {
      inc += item.price * item.quantity;
      return inc;
    }, 0);
    const taxAmount = subTotal * .1;
    const Total = subTotal + taxAmount;

    return {
      tax: taxAmount,
      subTotal: subTotal,
      total: Total
    };
  }

  checkout() {
    const data = this.calculate();
    this.router.navigate(['checkout', data]);
  }

}
