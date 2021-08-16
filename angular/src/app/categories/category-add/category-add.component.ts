import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_CATEGORY_LIST } from 'src/app/constants/app-route.constant';
import { ErrorResponse, SuccessResponse } from 'src/app/shared/models/api-response.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit, OnDestroy {

  isSubmitting = false;
  // Create form for the adding new product
  public categoryFormG: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  private addNewCategoryAPICallHandler: Subscription;

  constructor(private readonly categoryService: CategoryService, private route: Router) { }

  ngOnInit(): void {
  }

  onFormSubmitHandler(): void {
    if (!this.categoryFormG.valid) {
      return;
    }
    this.isSubmitting = true;
    this.addNewCategoryAPICallHandler = this.categoryService.addNewCategory(this.categoryFormG.value).subscribe(
      (data) => {
        this.isSubmitting = false;
        this.route.navigateByUrl(APP_CATEGORY_LIST);
      }, (error) => {
        this.isSubmitting = false;
      });
  }
  
  ngOnDestroy(): void {
    if (this.addNewCategoryAPICallHandler) {
      this.addNewCategoryAPICallHandler.unsubscribe();
    }
  }
  
}
