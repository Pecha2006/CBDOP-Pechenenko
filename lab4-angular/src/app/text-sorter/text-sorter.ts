
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-sorter',
  imports: [],
  templateUrl: './text-sorter.html',
  styleUrl: './text-sorter.css'
})
export class TextSorter {

  @Input() text: string = '';

  get errorMessage(): string {
    if (this.text.trim() === '') {
      return '';
    }

    const validText = /^[А-Яа-яІіЇїЄєҐґ\s]+$/u;

    if (!validText.test(this.text)) {
      return 'Помилка! Введіть українські слова!';
    }

    return '';
  }

  get sortedText(): string {
    if (this.text.trim() === '' || this.errorMessage !== '') {
      return '';
    }

    const words = this.text.trim().split(/\s+/);

    words.sort((a, b) =>
      a.localeCompare(b, 'uk', { sensitivity: 'base' })
    );

    return words.join(' ');
  }
}
