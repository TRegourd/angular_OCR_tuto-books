import { Router } from '@angular/router';
import { Book } from './../models/book.model';
import { BooksService } from './../services/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  fileIsUploaded: boolean = true;
  fileUrl: string = '';

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
    const newBook = new Book(
      formValue['title'],
      formValue['author'],
      this.fileUrl
    );
    this.booksService.createBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadImage(image: File) {
    const storage = getStorage();
    const fileName = Date.now().toString() + image.name;
    const storageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    let returnUrl: string = '';

    uploadTask.on(
      'state_changed',
      () => {
        console.log('uploading...');

        this.fileIsUploaded = false;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('uploaded');
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.fileUrl = downloadURL;
          this.fileIsUploaded = true;
        });
      }
    );
  }

  detectImage(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.files && eventTarget.files.length) {
      this.onUploadImage(eventTarget.files[0]);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
}
