import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth/signup',
    component: SignUpComponent,
  },
  {
    path: 'auth/signin',
    component: SignInComponent,
  },
  {
    path: 'books',
    component: BookListComponent,
  },
  {
    path: 'books/new',
    component: BookFormComponent,
  },
  {
    path: 'books/view/:id',
    component: SingleBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
