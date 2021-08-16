import { Component, OnInit } from '@angular/core';
import { APP_CART_LIST, APP_CATEGORY_LIST, APP_PRODUCT_LIST } from 'src/app/constants/app-route.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appTitle = 'Grocery App';

  menus = [
    {
      title: 'Categories',
      path: APP_CATEGORY_LIST
    },
    {
      title: 'Products',
      path: APP_PRODUCT_LIST
    },
    {
      title: 'Carts',
      path: APP_CART_LIST
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
