import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared-service/http.service';
import { ToastService } from '../toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

interface IHome {
  id?: number;
  inventoryImage: string;
  inventoryName: string;
  inventoryAuthor: string;
  inventoryType: string;
  inventoryPrice: string;
  inventoryQuantity: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  inventorys = [];
  homeCard: Array<IHome> = [];
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
    this.inventorys = await this.getInventorys('inventory');
  }

  async getInventorys(path: string) {
    const resp = await this.http.get(path);
    return resp;
  }

  async createInventory() {
    const inventory = {
      name: null,
      model: null,
      serial: null,
      price: null
    };
    const resp = await this.http.post('inventory', inventory);
    if (resp) {
      // this.refresh();
      this.inventorys.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Inventory creation failed!');
    }
    return resp;
  }

  async updateInventory(inventory: any) {
    const resp = await this.http.put(`inventory/id/${inventory.id}`, inventory);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Inventory updated successfully!');
    }
    return resp;
  }

  async removeInventory(inventory: any, index: number) {
    const resp = await this.http.delete(`inventory/id/${inventory.id}`);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Inventory deletion failed!');
    }
  }

  async AddToCart(inventory: any) {
    const resp = await this.http.post('ShoppingCart', inventory);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Added successfully');
    }
  }

  async getInventoryID(inventory: any, index: number) {
    const resp = await this.http.get(`inventory/id/${inventory.id}`);
    return inventory || [];
  }

  goToCreate() {
    this.router.navigate(['inventory-create']);
  }

}
