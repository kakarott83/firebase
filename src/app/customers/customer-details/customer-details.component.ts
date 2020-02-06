import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  @Input() customer!: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  updateActive(isActive: boolean) {
    if (!this.customer.key) {
      return;
    }

    this.customerService
      .updateCustomer(this.customer.key, {active: isActive})
      .catch(err => console.log(err));
  }

  deleteCustomer() {
    if (!this.customer.key) {
      return;
    }

    this.customerService
      .deleteCustomer(this.customer.key)
      .catch(err => console.log(err));
  }

}
