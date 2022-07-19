import { Router } from '@angular/router';
import { Book } from './../models/book.model';
import { BooksService } from './../services/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router
  ) {}

  initForm() {
    this.bookForm = this.formBuilder.group({
      author: ['', [Validators.required]],
      title: ['', [Validators.required]],
    });
  }

  onSubmitBookForm(): void {
    const formValue = this.bookForm.value;
    const newBook = new Book(formValue['title'], formValue['author']);
    this.booksService.createBook(newBook);
    this.router.navigate(['/books']);
  }

  ngOnInit(): void {
    this.initForm();
  }
}
