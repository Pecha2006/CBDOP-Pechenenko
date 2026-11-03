
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../services/character';

@Component({
  selector: 'app-character-modal',
  imports: [],
  templateUrl: './character-modal.html',
  styleUrl: './character-modal.css'
})
export class CharacterModal {

  @Input() character: Character | null = null;

  @Output() closed = new EventEmitter<void>();

  closeModal(): void {
    this.closed.emit();
  }
}
