import { Injectable, OnInit } from '@angular/core';
import { Category } from './category.model';
import { Product } from './product.model';
import { RestService } from './rest.service';

@Injectable()
export class ProductRepository implements OnInit {
  private products: Product[];
  constructor(private restService: RestService) {
    this.restService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }
  ngOnInit() {}
  getProduct(id: number): Product {
    return this.products.find((i) => i.id == id);
  }
  getProducts(category: Category = null): Product[] {
    if (category)
      return this.products.filter((p) => p.category == category.name);
    else return this.products;
  }
  saveProduct(product: Product) {
    if (product.id == null || product.id == 0 || product.id==undefined) {
      this.restService
        .addProduct(product)
        .subscribe((p) => {console.log(p); this.products.push(p)});
    } else {
      this.restService.updateProduct(product).subscribe((product) => {
        this.products.splice(
          this.products.findIndex((x) => x.id == product.id),
          1,
          product
        );
      });
    }
  }
}