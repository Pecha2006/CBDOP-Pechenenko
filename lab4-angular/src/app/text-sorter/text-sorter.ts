
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-sorter',
  imports: [],
  templateUrl: './text-sorter.html',
  styleUrl: './text-sorter.css'
})
export class TextSorter {

  @Input() text: string = '';

  get sortedText(): string {
    if (this.text.trim() === '') {
      return '';
    }

    const words = this.text.trim().split(/\s+/);

    words.sort((a, b) =>
      a.localeCompare(b, 'uk', { sensitivity: 'base' })
    );

    return words.join(' ');
  }
}
