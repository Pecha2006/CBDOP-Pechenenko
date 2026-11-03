
import { Component, OnInit, inject } from '@angular/core';
import { Character, CharacterService } from './services/character';
import { FavoritesStorageService } from './services/favorites-storage';
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
  private favoritesStorage = inject(FavoritesStorageService);

  characters: Character[] = [];
  favorites: Character[] = [];

  loading = false;
  error = '';

  selectedCharacter: Character | null = null;

  async ngOnInit(): Promise<void> {

    // Відновлення вибраних персонажів з Ionic Storage
    try {
      this.favorites = await this.favoritesStorage.getFavorites();
    } catch (error) {
      console.error('Помилка завантаження вибраного:', error);
    }

    // Завантаження персонажів з API
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

  async toggleFavorite(character: Character): Promise<void> {

    if (this.isFavorite(character.id)) {
      await this.removeFavorite(character.id);
      return;
    }

    this.favorites = [...this.favorites, character];

    await this.saveFavorites();
  }

  async removeFavorite(id: number): Promise<void> {

    this.favorites = this.favorites.filter(
      character => character.id !== id
    );

    await this.saveFavorites();
  }

  private async saveFavorites(): Promise<void> {
    try {
      await this.favoritesStorage.saveFavorites(this.favorites);
    } catch (error) {
      console.error('Помилка збереження вибраного:', error);
    }
  }
}
