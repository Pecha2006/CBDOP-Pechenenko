
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../services/character';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {

  @Input() characters: Character[] = [];

  @Output() remove = new EventEmitter<number>();

  removeCharacter(id: number): void {
    this.remove.emit(id);
  }
}
