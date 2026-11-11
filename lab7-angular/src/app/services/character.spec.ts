import { TestBed } from '@angular/core/testing';
import axios from 'axios';
import { CharacterService } from './character';
import { MOCK_RESPONSE } from '../testing/mock-data';

/**
 * Тести CharacterService.
 * Справжній HTTP-запит не виконується: axios.get замінено шпигуном (spyOn).
 */
describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterService);
  });

  it('повинен створити сервіс', () => {
    expect(service).toBeTruthy();
  });

  it('повинен повернути дані персонажів з API', async () => {
    spyOn(axios, 'get').and.resolveTo({ data: MOCK_RESPONSE });

    const result = await service.getCharacters();

    expect(result).toEqual(MOCK_RESPONSE);
    expect(result.results).toHaveSize(4);
  });

  it('повинен передавати номер сторінки за замовчуванням (1)', async () => {
    const getSpy = spyOn(axios, 'get').and.resolveTo({ data: MOCK_RESPONSE });

    await service.getCharacters();

    expect(getSpy).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character', {
      params: { page: 1 }
    });
  });

  it('повинен передавати вказаний номер сторінки', async () => {
    const getSpy = spyOn(axios, 'get').and.resolveTo({ data: MOCK_RESPONSE });

    await service.getCharacters(3);

    const [url, config] = getSpy.calls.mostRecent().args;
    expect(url).toMatch(/rickandmortyapi\.com/);
    expect((config as { params: { page: number } }).params.page).toBe(3);
  });

  it('повинен пробросити помилку, якщо запит не вдався', async () => {
    spyOn(axios, 'get').and.rejectWith(new Error('Network Error'));

    await expectAsync(service.getCharacters()).toBeRejectedWithError('Network Error');
  });
});
