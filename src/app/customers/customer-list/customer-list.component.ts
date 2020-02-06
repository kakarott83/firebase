import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  subscription?: Subscription;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.subscription = this.getCustomerList();
  }

  getCustomerList() {
    return this.customerService.getCustomersList()
      .snapshotChanges()
      .pipe(
        map(
          changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})
          )
        ))
      .subscribe(customers => {
        this.customers = customers;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deleteCustomers() {
    this.customerService.deleteAll()
      .catch(err => console.log(err));
  }

}
