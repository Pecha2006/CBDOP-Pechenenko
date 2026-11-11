
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class FavoritesStorageService {

  private storageKey = 'rickAndMortyFavorites';
  private storageReady: Promise<Storage>;

  constructor(private storage: Storage) {
    this.storageReady = this.storage.create();
  }

  async getFavorites(): Promise<Character[]> {
    const storage = await this.storageReady;

    const favorites = await storage.get(this.storageKey);

    return Array.isArray(favorites) ? favorites : [];
  }

  async saveFavorites(characters: Character[]): Promise<void> {
    const storage = await this.storageReady;

    await storage.set(this.storageKey, characters);
  }
}
