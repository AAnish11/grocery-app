import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { APP_CATEGORY_ADD, APP_PRODUCT_ADD } from 'src/app/constants/app-route.constant';
import { CategoryService } from '../category.service';
import CategoryListModel from '../models/category-list.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  public addNewCategory = APP_CATEGORY_ADD; // app route path
  public cateData: CategoryListModel[] = [];
  
  // Subscription handler for api call
  private categoryListApiHandler: Subscription;

  constructor(private readonly catService: CategoryService) { }

  ngOnInit(): void {
    // fetch all existing categories
    this.categoryListApiHandler = this.catService.getCategoryList().subscribe((data: CategoryListModel[]) => {
      this.cateData = data;
    });
  }

  ngOnDestroy(): void {
    this.categoryListApiHandler.unsubscribe();
  }

}
