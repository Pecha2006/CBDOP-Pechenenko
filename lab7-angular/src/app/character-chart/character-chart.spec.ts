import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import Chart from 'chart.js/auto';
import { CharacterChart } from './character-chart';
import { MOCK_CHARACTERS, createCharacter } from '../testing/mock-data';

/**
 * Тести компонента з діаграмою Chart.js.
 */
describe('CharacterChart', () => {
  let fixture: ComponentFixture<CharacterChart>;
  let component: CharacterChart;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterChart]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterChart);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy(); // знищуємо діаграму після кожного тесту
  });

  /** Повертає екземпляр Chart.js, прив'язаний до canvas компонента. */
  function getChart(): Chart | undefined {
    return Chart.getChart(fixture.nativeElement.querySelector('canvas'));
  }

  it('повинен створити компонент та відобразити canvas', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('canvas')).not.toBeNull();
  });

  it('повинен створити кругову діаграму з правильною статистикою', () => {
    fixture.componentRef.setInput('characters', MOCK_CHARACTERS);
    fixture.detectChanges();

    const chart = getChart();
    expect(chart).toBeDefined();
    expect(chart!.data.labels).toEqual(['Живі', 'Мертві', 'Невідомо']);
    // 2 живих, 1 мертвий, 1 невідомо
    expect(chart!.data.datasets[0].data).toEqual([2, 1, 1]);
  });

  it('повинен оновити діаграму при зміні @Input', () => {
    fixture.componentRef.setInput('characters', MOCK_CHARACTERS);
    fixture.detectChanges();

    fixture.componentRef.setInput('characters', [createCharacter({ status: 'Dead' })]);
    fixture.detectChanges();

    expect(getChart()!.data.datasets[0].data).toEqual([0, 1, 0]);
  });

  it('не повинен оновлювати діаграму до ініціалізації view', () => {
    component.ngOnChanges({ characters: new SimpleChange([], MOCK_CHARACTERS, true) });

    expect(getChart()).toBeUndefined();
  });

  it('повинен знищити діаграму при ngOnDestroy', () => {
    fixture.detectChanges();
    const chart = getChart()!;
    spyOn(chart, 'destroy').and.callThrough();

    component.ngOnDestroy();

    expect(chart.destroy).toHaveBeenCalled();
  });
});
