import { Component, OnInit, inject } from '@angular/core';
import { Character } from './services/character';
import { CharacterCacheProxy } from './services/character-cache.proxy';
import { SORT_STRATEGIES, SortStrategy } from './patterns/sort-strategy';
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

  // Проксі з кешем замість прямого сервісу (патерн Proxy)
  private characterService = inject(CharacterCacheProxy);
  private favoritesStorage = inject(FavoritesStorageService);

  characters: Character[] = [];
  /** Персонажі у порядку, який задала обрана стратегія сортування. */
  displayedCharacters: Character[] = [];
  favorites: Character[] = [];

  /** Доступні стратегії сортування та поточна (патерн Strategy). */
  readonly sortStrategies: SortStrategy[] = SORT_STRATEGIES;
  selectedSort: SortStrategy = SORT_STRATEGIES[0];

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
      this.applySort();
    } catch (error) {
      console.error('Помилка API:', error);
      this.error = 'Не вдалося завантажити персонажів, перевірте API';
    } finally {
      this.loading = false;
    }
  }

  /** Кнопка «Оновити»: очищає кеш і йде до API. */
  async refreshCharacters(): Promise<void> {
    this.characterService.clearCache();
    await this.loadCharacters();
  }

  /** Викликається, коли користувач вибирає пункт у списку сортування. */
  onSortChange(label: string): void {
    this.selectedSort =
      this.sortStrategies.find(strategy => strategy.label === label) ?? this.selectedSort;
    this.applySort();
  }

  private applySort(): void {
    this.displayedCharacters = this.selectedSort.sort(this.characters);
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
