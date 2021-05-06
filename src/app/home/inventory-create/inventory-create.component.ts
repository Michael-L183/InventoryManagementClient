import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../shared-service/http.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {

  inventory: object;


  constructor(
    private http: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.inventory = {};
  }

  async createInventory(inventory: any) {
    const resp = await this.http.post('inventory', inventory);
    return inventory || null;
  }

  async addInventory(inventory: object) {
    const resp = await this.createInventory(inventory);
    if (resp) {
      this.router.navigate(['']);
    }
  }
}
