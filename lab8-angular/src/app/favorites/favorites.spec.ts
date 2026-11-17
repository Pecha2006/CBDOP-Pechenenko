import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Favorites } from './favorites';
import { MOCK_CHARACTERS } from '../testing/mock-data';

/**
 * Тести компонента Favorites (@Input characters, @Output remove).
 */
describe('Favorites', () => {
  let fixture: ComponentFixture<Favorites>;
  let component: Favorites;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favorites]
    }).compileComponents();

    fixture = TestBed.createComponent(Favorites);
    component = fixture.componentInstance;
  });

  it('повинен створити компонент', () => {
    expect(component).toBeTruthy();
  });

  it('повинен мати порожній список за замовчуванням', () => {
    expect(component.characters).toEqual([]);
  });

  it('повинен показати повідомлення, якщо вибраних немає', () => {
    fixture.detectChanges();

    const empty: HTMLElement = fixture.nativeElement.querySelector('.empty-message');
    expect(empty).toBeTruthy();
    expect(empty.textContent).toContain('Ви ще не додали');
  });

  it('повинен прийняти @Input та відобразити картки персонажів', () => {
    fixture.componentRef.setInput('characters', MOCK_CHARACTERS.slice(0, 2));
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.favorite-card');
    expect(cards.length).toBe(2);
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('(2)');
  });

  it('повинен відобразити ім\'я та вид персонажа', () => {
    fixture.componentRef.setInput('characters', [MOCK_CHARACTERS[2]]);
    fixture.detectChanges();

    const card: HTMLElement = fixture.nativeElement.querySelector('.favorite-card');
    expect(card.textContent).toContain('Birdperson');
    expect(card.textContent).toContain('Alien');
  });

  it('removeCharacter повинен емітити id через @Output remove', (done: DoneFn) => {
    component.remove.subscribe((id: number) => {
      expect(id).toBe(42);
      done();
    });

    component.removeCharacter(42);
  });

  it('повинен емітити подію при кліку на кнопку "Видалити"', () => {
    spyOn(component.remove, 'emit');
    fixture.componentRef.setInput('characters', [MOCK_CHARACTERS[1]]);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.remove-button');
    button.click();

    expect(component.remove.emit).toHaveBeenCalledWith(2);
  });
});
