import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { Info } from 'src/app/model/info';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  infos: Info = {};
  customer: Customer = {  };
  submitted = false;

  constructor(private customerService: CustomerService) {
   }

  ngOnInit() {
    console.log(this.customer);
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = {};
  }

  saveCustomer(): void {
    this.customerService.createCustomer(this.customer);
    this.customer = {};
  }

  onSubmit(): void {
    this.customer.infos = this.infos;
    console.log(this.customer);
    this.submitted = true;
    this.saveCustomer();

  }

}
