import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productName = 'Book';
  isDisabled = true;
  products = ['A Book', 'A Tree'];

  constructor() { 
    setTimeout(() => {
    //   this.productName = 'Tree';
    this.isDisabled = false;
    }, 3000);
  }

  onAddProduct(form) {
    // this.products.push(this.productName);
    // console.log(form);
    if (form.valid) {
      this.products.push(form.valid.productName);
    }
  }

  onRemoveProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
  }
  ngOnInit() {
  }

}
