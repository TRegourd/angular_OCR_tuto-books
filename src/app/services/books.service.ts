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
import {
  getDownloadURL,
  getStorage,
  ref as storage_ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books: Book[] = [];
  private book!: Book;
  bookSubject = new Subject<Book[]>();
  singleBookSubject = new Subject<Book>();

  constructor() {}

  emitBooks() {
    this.bookSubject.next(this.books.slice());
  }

  emitSingleBook() {
    this.singleBookSubject.next(this.book);
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
    onValue(
      ref(db, '/books/' + id),
      (snapshot: DataSnapshot) => {
        if (snapshot.val()) {
          this.book = snapshot.val();
          this.emitSingleBook();
        }
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
