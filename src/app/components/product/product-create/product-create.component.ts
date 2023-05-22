import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CurrencyService } from '../../../services/currency.service';
import { ICurrency } from '../../../models/currency';
import { IBrand } from '../../../models/brand';
import { ICategory } from '../../../models/category';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm!: FormGroup;
  
  currencies: ICurrency[] = [];
  brands: IBrand[] = [];
  categories: ICategory[] = [];
  newProduct: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService, 
    private currencyService: CurrencyService,
    private categoryService: CategoryService,
    private brandService: BrandService
    ) { }

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      brandId: ['', Validators.required],
      price: ['', Validators.required],
      quantity: [''],
      currencyId: ['', Validators.required],
      categoryId: ['', Validators.required]
    });

    this.loadCurrencies();
    this.loadBrands();
    this.loadCategories();
  }

  loadCurrencies() {
    this.currencyService.getCurrencies().subscribe(
      (data: ICurrency[]) => {
        this.currencies = data;
      },
      error => {
        console.log('Error retrieving currencies: ', error);
      }
    );
  }

  loadBrands() {
    this.brandService.getBrands().subscribe(
      (data: IBrand[]) => {
        this.brands = data;
      },
      error => {
        console.log('Error retrieving brands: ', error);
      }
    );
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: ICategory[]) => {
        this.categories = data;
      },
      error => {
        console.log('Error retrieving categories: ', error);
      }
    );
  }

  createProduct() {
    this.productService.createProduct(this.newProduct).subscribe(
      (data: any) => {
        console.log('Product created successfully: ', data);
        // Reset the form or navigate to another page
      },
      error => {
        console.log('Error creating product: ', error);
      }
    );
  }
}
