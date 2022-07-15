import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'openClassRoom-angular-books';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAbib9JBZ_uTD25U3CI3osedxDSWNa1Y78',
      authDomain: 'ocr-angluar-http-client-demo.firebaseapp.com',
      databaseURL:
        'https://ocr-angluar-http-client-demo-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'ocr-angluar-http-client-demo',
      storageBucket: 'ocr-angluar-http-client-demo.appspot.com',
      messagingSenderId: '460584010018',
      appId: '1:460584010018:web:abe3eb2366c3e15c65657b',
    };
    firebase.initializeApp(firebaseConfig);
  }
}
