import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text-drop',
  templateUrl: './text-drop.component.html',
  styleUrls: ['./text-drop.component.scss'],
})
export class TextDropComponent implements OnInit {
  @Output() uploadedText = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleFileInput(files: FileList): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.uploadedText.emit(reader.result);
    });
    if (!files[0].name.includes('.txt')) {
      alert('Please use a .txt file!');
    } else {
      reader.readAsText(files[0]);
    }
  }
}
