import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productName = 'Book';
  isDisabled = true;
  constructor() { 
    setTimeout(() => {
    //   this.productName = 'Tree';
    this.isDisabled = false;
    }, 3000);

  }

  ngOnInit() {
  }

}
