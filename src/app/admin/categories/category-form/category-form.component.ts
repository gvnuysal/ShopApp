import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/model/category.model';
import { CategoryRepository } from 'src/app/model/category.repository';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  editing: boolean = false;
  category: Category = new Category();

  constructor(
    private activatedRoute: ActivatedRoute,
    private repository: CategoryRepository,
    private router: Router
  ) {
    this.editing = this.activatedRoute.snapshot.params['mode'] == 'edit';
    if (this.editing) {
      this.category = this.repository.getCategory(
        activatedRoute.snapshot.params['id']
      );
    }
  }

  ngOnInit(): void {}

  save() {
    this.repository.saveCategory(this.category);
    this.router.navigateByUrl('/admin/main/categories');
  }
}
