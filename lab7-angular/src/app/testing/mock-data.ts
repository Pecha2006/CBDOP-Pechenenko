import { Character, CharacterResponse } from '../services/character';

/**
 * Тестові дані, спільні для всіх spec-файлів (принцип DRY).
 * Функція createCharacter дозволяє швидко створити персонажа,
 * перевизначивши лише потрібні поля.
 */
export function createCharacter(overrides: Partial<Character> = {}): Character {
  return {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['ep1', 'ep2', 'ep3'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
    ...overrides
  };
}

export const MOCK_CHARACTERS: Character[] = [
  createCharacter({ id: 1, name: 'Rick Sanchez', status: 'Alive' }),
  createCharacter({ id: 2, name: 'Morty Smith', status: 'Alive' }),
  createCharacter({ id: 3, name: 'Birdperson', status: 'Dead', species: 'Alien' }),
  createCharacter({ id: 4, name: 'Mr. Poopybutthole', status: 'unknown', species: 'Unknown' })
];

export const MOCK_RESPONSE: CharacterResponse = {
  info: { count: 4, pages: 1, next: null, prev: null },
  results: MOCK_CHARACTERS
};
