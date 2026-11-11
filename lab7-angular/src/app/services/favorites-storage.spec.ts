import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { FavoritesStorageService } from './favorites-storage';
import { MOCK_CHARACTERS } from '../testing/mock-data';

/**
 * Тести FavoritesStorageService.
 * Ionic Storage замінено мок-об'єктом, тому дані не пишуться в IndexedDB.
 */
describe('FavoritesStorageService', () => {
  let service: FavoritesStorageService;
  let storageMock: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storageMock = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);
    // create() повертає сам Storage, як і справжній Ionic Storage
    storageMock.create.and.callFake(async () => storageMock);

    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useValue: storageMock }]
    });
    service = TestBed.inject(FavoritesStorageService);
  });

  it('повинен створити сервіс та ініціалізувати сховище', () => {
    expect(service).toBeTruthy();
    expect(storageMock.create).toHaveBeenCalledTimes(1);
  });

  it('повинен повернути збережених персонажів', async () => {
    storageMock.get.and.resolveTo(MOCK_CHARACTERS);

    const favorites = await service.getFavorites();

    expect(storageMock.get).toHaveBeenCalledWith('rickAndMortyFavorites');
    expect(favorites).toEqual(MOCK_CHARACTERS);
  });

  it('повинен повернути порожній масив, якщо даних немає', async () => {
    storageMock.get.and.resolveTo(null);

    const favorites = await service.getFavorites();

    expect(favorites).toEqual([]);
  });

  it('повинен повернути порожній масив, якщо дані пошкоджені (не масив)', async () => {
    storageMock.get.and.resolveTo('not an array');

    expect(await service.getFavorites()).toHaveSize(0);
  });

  it('повинен зберегти персонажів у сховище', async () => {
    storageMock.set.and.resolveTo();

    await service.saveFavorites(MOCK_CHARACTERS);

    expect(storageMock.set).toHaveBeenCalledOnceWith('rickAndMortyFavorites', MOCK_CHARACTERS);
  });
});
