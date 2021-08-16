import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { CategoryService } from 'src/app/categories/category.service';
import CategoryListModel from 'src/app/categories/models/category-list.model';
import { APP_CATEGORY_ADD, APP_PRODUCT_LIST } from 'src/app/constants/app-route.constant';
import { DEFAULT_DESC_TEXT } from 'src/app/constants/messages.constant';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  // App Navigation Paths
  addNewCategoryPath = APP_CATEGORY_ADD;
  productListPath = APP_PRODUCT_LIST;

  // Handle form submit button disabled/enabled
  isSubmitting = false;

  // API subscription handler 
  addProductApiHandler: Subscription;
  
  // Create form for the adding new product
  public productFormG: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    productDescription: new FormControl(DEFAULT_DESC_TEXT, [Validators.required, Validators.minLength(10)]),
    productPrice: new FormControl(1, [Validators.required, Validators.min(0.1)]),
    productUnit: new FormControl(1, [Validators.required, Validators.min(1)]),
    categoryId: new FormControl(1, [Validators.required]),
  });

  // Category Observable,
  categories$: Observable<CategoryListModel[]> = of([]);

  constructor(private readonly catService: CategoryService, 
    private productService: ProductService, 
    private readonly route: Router) { 
    this.categories$ = this.catService.getCategoryList();
  }

  ngOnInit(): void {
  }

  onFormSubmitHandler(): void {
    if (!this.productFormG.valid) {
      return;
    }
    this.isSubmitting = true;
    let formData = {...this.productFormG.value};
    formData.productPrice = +formData.productPrice;
    this.addProductApiHandler = this.productService.addNewProduct(formData).subscribe(
      (data) => {
        this.route.navigateByUrl(APP_PRODUCT_LIST);
      },
      (error) => {
        // Error Handler
      }
    );

  }

  ngOnDestroy(): void {
    // If API call in progress or initiated
    if (this.addProductApiHandler) {
      this.addProductApiHandler.unsubscribe();
    }
  }
}
