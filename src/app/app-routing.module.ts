import { AuthGardService } from './services/auth-gard.service';
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
    canActivate: [AuthGardService],
    component: BookListComponent,
  },
  {
    path: 'books/new',
    canActivate: [AuthGardService],
    component: BookFormComponent,
  },
  {
    path: 'books/view/:id',
    canActivate: [AuthGardService],
    component: SingleBookComponent,
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
