
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextSorter } from './text-sorter/text-sorter';

@Component({
  selector: 'app-root',
  imports: [FormsModule, TextSorter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  text: string = '';
}
