import { Book } from './../../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from './../../services/books.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss'],
})
export class SingleBookComponent implements OnInit, OnDestroy {
  book!: Book;
  bookSubscription!: Subscription;

  constructor(
    private bookService: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.bookSubscription = this.bookService.singleBookSubject.subscribe(
      (book: Book) => {
        this.book = book;
      }
    );
    this.bookService.getSingleBook(Number(id));
    this.bookService.emitSingleBook();
  }
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
}
