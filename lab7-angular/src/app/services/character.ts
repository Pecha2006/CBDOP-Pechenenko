
import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';

  async getCharacters(page: number = 1): Promise<CharacterResponse> {
    const response = await axios.get<CharacterResponse>(
      this.apiUrl,
      { params: { page } }
    );

    return response.data;
  }
}
