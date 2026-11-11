import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { App } from './app';
import { CharacterService } from './services/character';
import { FavoritesStorageService } from './services/favorites-storage';
import { MOCK_CHARACTERS, MOCK_RESPONSE } from './testing/mock-data';

/**
 * Тести головного компонента App.
 * Обидва сервіси замінені моками (jasmine.createSpyObj),
 * тому тести не звертаються до реального API та сховища.
 */
describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let characterServiceMock: jasmine.SpyObj<CharacterService>;
  let storageServiceMock: jasmine.SpyObj<FavoritesStorageService>;

  beforeEach(async () => {
    characterServiceMock = jasmine.createSpyObj('CharacterService', ['getCharacters']);
    storageServiceMock = jasmine.createSpyObj('FavoritesStorageService', [
      'getFavorites',
      'saveFavorites'
    ]);

    characterServiceMock.getCharacters.and.resolveTo(MOCK_RESPONSE);
    storageServiceMock.getFavorites.and.resolveTo([]);
    storageServiceMock.saveFavorites.and.resolveTo();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: CharacterService, useValue: characterServiceMock },
        { provide: FavoritesStorageService, useValue: storageServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  /** Допоміжна функція: запускає ngOnInit і чекає завершення всіх промісів. */
  async function initComponent(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('повинен створити компонент', () => {
    expect(component).toBeTruthy();
  });

  it('повинен мати порожні початкові значення', () => {
    expect(component.characters).toEqual([]);
    expect(component.favorites).toHaveSize(0);
    expect(component.loading).toBeFalse();
    expect(component.selectedCharacter).toBeNull();
  });

  it('повинен відобразити заголовок у h1', () => {
    fixture.detectChanges();
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Персонажі Rick and Morty');
  });

  it('повинен завантажити персонажів з сервісу при ініціалізації (async/await)', async () => {
    await initComponent();

    expect(characterServiceMock.getCharacters).toHaveBeenCalledTimes(1);
    expect(component.characters).toEqual(MOCK_CHARACTERS);
    expect(component.loading).toBeFalse();
  });

  it('повинен відновити вибране зі сховища при ініціалізації', async () => {
    storageServiceMock.getFavorites.and.resolveTo([MOCK_CHARACTERS[0]]);

    await initComponent();

    expect(storageServiceMock.getFavorites).toHaveBeenCalled();
    expect(component.favorites.length).toBe(1);
  });

  it('повинен продовжити роботу, якщо сховище повернуло помилку', async () => {
    spyOn(console, 'error');
    storageServiceMock.getFavorites.and.rejectWith(new Error('storage error'));

    await initComponent();

    expect(console.error).toHaveBeenCalled();
    expect(component.characters.length).toBeGreaterThan(0);
  });

  it('повинен показати повідомлення про помилку, якщо API недоступне', async () => {
    spyOn(console, 'error');
    characterServiceMock.getCharacters.and.rejectWith(new Error('Network Error'));

    await initComponent();

    expect(component.error).toBe('Не вдалося завантажити персонажів.');
    const errorEl: HTMLElement = fixture.nativeElement.querySelector('.error');
    expect(errorEl.textContent).toContain('Не вдалося');
  });

  it('повинен встановлювати loading=true під час завантаження (fakeAsync)', fakeAsync(() => {
    component.loadCharacters();
    expect(component.loading).toBeTrue();

    flushMicrotasks(); // завершуємо проміс сервісу

    expect(component.loading).toBeFalse();
  }));

  it('повинен відобразити рядок таблиці для кожного персонажа', async () => {
    await initComponent();

    const rows = fixture.nativeElement.querySelectorAll('tr.character-row');
    expect(rows.length).toBe(MOCK_CHARACTERS.length);
    expect(rows[0].textContent).toContain('Rick Sanchez');
  });

  it('повинен показати "Персонажів не знайдено", якщо список порожній', async () => {
    characterServiceMock.getCharacters.and.resolveTo({ ...MOCK_RESPONSE, results: [] });

    await initComponent();

    expect(fixture.nativeElement.textContent).toContain('Персонажів не знайдено.');
  });

  it('повинен відкрити модальне вікно при кліку на рядок', async () => {
    await initComponent();

    const row: HTMLElement = fixture.nativeElement.querySelector('tr.character-row');
    row.click();
    fixture.detectChanges();

    expect(component.selectedCharacter).toEqual(MOCK_CHARACTERS[0]);
    expect(fixture.nativeElement.querySelector('app-character-modal')).not.toBeNull();
  });

  it('повинен закрити модальне вікно', () => {
    component.openModal(MOCK_CHARACTERS[1]);
    component.closeModal();
    expect(component.selectedCharacter).toBeNull();
  });

  it('isFavorite повинен перевіряти наявність персонажа у вибраному', () => {
    component.favorites = [MOCK_CHARACTERS[0]];
    expect(component.isFavorite(1)).toBeTrue();
    expect(component.isFavorite(2)).toBeFalse();
  });

  it('toggleFavorite повинен додати персонажа та зберегти у сховище', async () => {
    await component.toggleFavorite(MOCK_CHARACTERS[2]);

    expect(component.favorites).toContain(MOCK_CHARACTERS[2]);
    expect(storageServiceMock.saveFavorites).toHaveBeenCalledWith([MOCK_CHARACTERS[2]]);
  });

  it('toggleFavorite повинен видалити персонажа, якщо він уже у вибраному', async () => {
    component.favorites = [MOCK_CHARACTERS[0], MOCK_CHARACTERS[1]];

    await component.toggleFavorite(MOCK_CHARACTERS[0]);

    expect(component.favorites).not.toContain(MOCK_CHARACTERS[0]);
    expect(component.favorites).toHaveSize(1);
  });

  it('повинен залогувати помилку, якщо збереження не вдалося', async () => {
    spyOn(console, 'error');
    storageServiceMock.saveFavorites.and.rejectWith(new Error('save error'));

    await component.toggleFavorite(MOCK_CHARACTERS[0]);

    expect(console.error).toHaveBeenCalledWith('Помилка збереження вибраного:', jasmine.any(Error));
  });

  it('клік на зірочку не повинен відкривати модальне вікно', async () => {
    await initComponent();

    const starButton: HTMLButtonElement = fixture.nativeElement.querySelector('.favorite-button');
    starButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.selectedCharacter).toBeNull();
    expect(component.isFavorite(MOCK_CHARACTERS[0].id)).toBeTrue();
    expect(starButton.classList.contains('active')).toBeTrue();
  });
});
