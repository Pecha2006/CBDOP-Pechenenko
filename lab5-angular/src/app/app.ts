
import { Component, OnInit, inject } from '@angular/core';
import { Character, CharacterService } from './services/character';
import { CharacterModal } from './character-modal/character-modal';
import { Favorites } from './favorites/favorites';
import { CharacterChart } from './character-chart/character-chart';

@Component({
  selector: 'app-root',
  imports: [CharacterModal, Favorites, CharacterChart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private characterService = inject(CharacterService);

  characters: Character[] = [];
  favorites: Character[] = [];

  loading = false;
  error = '';

  selectedCharacter: Character | null = null;

  async ngOnInit(): Promise<void> {
    await this.loadCharacters();
  }

  async loadCharacters(): Promise<void> {
    this.loading = true;
    this.error = '';

    try {
      const response = await this.characterService.getCharacters();
      this.characters = response.results;
    } catch (error) {
      console.error('Помилка API:', error);
      this.error = 'Не вдалося завантажити персонажів.';
    } finally {
      this.loading = false;
    }
  }

  openModal(character: Character): void {
    this.selectedCharacter = character;
  }

  closeModal(): void {
    this.selectedCharacter = null;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(character => character.id === id);
  }

  toggleFavorite(character: Character): void {
    if (this.isFavorite(character.id)) {
      this.removeFavorite(character.id);
    } else {
      this.favorites = [...this.favorites, character];
    }
  }

  removeFavorite(id: number): void {
    this.favorites = this.favorites.filter(
      character => character.id !== id
    );
  }
}
