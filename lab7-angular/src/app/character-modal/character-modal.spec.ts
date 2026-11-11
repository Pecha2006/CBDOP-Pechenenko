import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterModal } from './character-modal';
import { createCharacter } from '../testing/mock-data';

/**
 * Тести модального вікна з детальною інформацією про персонажа.
 */
describe('CharacterModal', () => {
  let fixture: ComponentFixture<CharacterModal>;
  let component: CharacterModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterModal]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterModal);
    component = fixture.componentInstance;
  });

  it('повинен створити компонент', () => {
    expect(component).toBeTruthy();
  });

  it('не повинен нічого відображати, якщо персонаж не переданий', () => {
    fixture.detectChanges();

    expect(component.character).toBeNull();
    expect(fixture.nativeElement.querySelector('.modal-overlay')).toBeNull();
  });

  it('повинен відобразити інформацію про персонажа', () => {
    fixture.componentRef.setInput('character', createCharacter());
    fixture.detectChanges();

    const text: string = fixture.nativeElement.textContent;
    expect(fixture.nativeElement.querySelector('h3').textContent).toContain('Rick Sanchez');
    expect(text).toContain('Earth (C-137)');
    expect(text).toContain('Citadel of Ricks');
  });

  it('повинен показати кількість епізодів та дату у форматі YYYY-MM-DD', () => {
    fixture.componentRef.setInput('character', createCharacter());
    fixture.detectChanges();

    const text: string = fixture.nativeElement.textContent;
    expect(text).toMatch(/Кількість епізодів:\s*3/);
    expect(text).toContain('2017-11-04');
  });

  it('повинен показати "Не вказано", якщо тип порожній', () => {
    fixture.componentRef.setInput('character', createCharacter({ type: '' }));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Не вказано');
  });

  it('повинен показати тип, якщо він заданий', () => {
    fixture.componentRef.setInput('character', createCharacter({ type: 'Parasite' }));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Parasite');
    expect(fixture.nativeElement.textContent).not.toContain('Не вказано');
  });

  it('повинен передати фото та alt у тег img', () => {
    const character = createCharacter();
    fixture.componentRef.setInput('character', character);
    fixture.detectChanges();

    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.src).toBe(character.image);
    expect(img.alt).toBe('Rick Sanchez');
  });

  it('повинен емітити closed при кліку на кнопки закриття', () => {
    spyOn(component.closed, 'emit');
    fixture.componentRef.setInput('character', createCharacter());
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.close-button').click();
    fixture.nativeElement.querySelector('.close-modal-button').click();

    expect(component.closed.emit).toHaveBeenCalledTimes(2);
  });
});
