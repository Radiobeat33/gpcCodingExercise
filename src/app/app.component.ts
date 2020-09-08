import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gpc-shopping-cart';
  uploadedText: string;

  setUploadedText(text: string): void {
    this.uploadedText = text;
  }
}
