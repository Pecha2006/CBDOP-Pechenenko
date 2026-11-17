import { Injectable, inject } from '@angular/core';
import { CharacterResponse, CharacterService } from './character';

/**
 * ПАТЕРН PROXY. Має той самий метод getCharacters, що й CharacterService,
 * але перед запитом до API перевіряє кеш.
 */
@Injectable({
  providedIn: 'root'
})
export class CharacterCacheProxy {

  private characterService = inject(CharacterService);
  private cache = new Map<number, CharacterResponse>();

  async getCharacters(page: number = 1): Promise<CharacterResponse> {
    const cached = this.cache.get(page);

    if (cached) {
      return cached;
    }

    const response = await this.characterService.getCharacters(page);
    this.cache.set(page, response);

    return response;
  }

  /** Очищає кеш, наступний запит піде до API. */
  clearCache(): void {
    this.cache.clear();
  }
}
