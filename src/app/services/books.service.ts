import { AppComponent } from './../app.component';
import { Book } from './../models/book.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  constructor() {}

  emitBooks() {
    this.bookSubject.next(this.books.slice());
  }

  saveBooks() {
    const db = getDatabase();
    set(ref(db, '/books'), this.books);
  }

  getBooks() {
    const db = getDatabase();
    const books = ref(db, '/books');
    onValue(books, (snapshot: DataSnapshot) => {
      this.books = snapshot.val() ? snapshot.val() : [];
      this.emitBooks();
    });
  }

  getSingleBook(id: number) {
    const db = getDatabase();
    const book = ref(db, '/books/' + id);
    onValue(
      book,
      (snapshot: DataSnapshot) => {
        return snapshot.val() ? snapshot.val() : [];
      },
      { onlyOnce: true }
    );
  }

  createBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(bookToDelete: Book) {
    const bookToDeleteIndex = this.books.findIndex((book: Book) => {
      if (book === bookToDelete) {
        return true;
      } else {
        return false;
      }
    });
    this.books.splice(bookToDeleteIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }
}
