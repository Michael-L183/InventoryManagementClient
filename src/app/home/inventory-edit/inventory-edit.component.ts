import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../shared-service/http.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent implements OnInit {

  inventory: object = {};

  constructor(
    private http: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { }
  async ngOnInit() {
    const resp = await this.getInventoryById(this.activatedRoute.snapshot.params[`id`]);
    this.inventory = resp.data || [];

  }

  async getInventoryById(inventoryID) {
    const resp = await this.http.get(`inventory/id/${inventoryID}`);
    return resp || [];
  }



  async update(inventoryID, inventory) {
    const resp = await this.http.put(`inventory/id/${inventoryID}`, inventory);
    return resp;
  }

  async updateInventory(inventory: any) {
    const inventoryID = inventory.id;
    const resp = await this.update(inventoryID, inventory);
    if (resp) {
      this.router.navigate(['']);
    }
  }

}

// this.activatedRoute.snapshot.params['id']
