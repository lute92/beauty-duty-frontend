import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error) => {
        console.log('Failed to retrieve products:', error);
      }
    );
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.getProducts();
      },
      (error) => {
        console.log('Failed to delete product:', error);
      }
    );
  }
}
