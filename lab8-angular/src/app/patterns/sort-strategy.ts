import { Character } from '../services/character';

/**
 * ПАТЕРН STRATEGY. Кожна стратегія містить один алгоритм сортування.
 * App викликає sort() і не знає, як саме сортується список.
 */
export interface SortStrategy {
  readonly label: string;
  sort(characters: Character[]): Character[];
}

/** Без сортування: повертає копію масиву. */
export class NoSortStrategy implements SortStrategy {
  readonly label = 'Без сортування';

  sort(characters: Character[]): Character[] {
    return [...characters];
  }
}

/** За іменем від А до Я. */
export class NameSortStrategy implements SortStrategy {
  readonly label = 'За іменем (А → Я)';

  sort(characters: Character[]): Character[] {
    return [...characters].sort((a, b) => a.name.localeCompare(b.name, 'en'));
  }
}

/** За статусом: живі, потім мертві, потім невідомі. */
export class StatusSortStrategy implements SortStrategy {
  readonly label = 'За статусом';

  private readonly order: Record<string, number> = {
    Alive: 0,
    Dead: 1,
    unknown: 2
  };

  sort(characters: Character[]): Character[] {
    return [...characters].sort(
      (a, b) => (this.order[a.status] ?? 3) - (this.order[b.status] ?? 3)
    );
  }
}

/** Усі стратегії для випадаючого списку. */
export const SORT_STRATEGIES: SortStrategy[] = [
  new NoSortStrategy(),
  new NameSortStrategy(),
  new StatusSortStrategy()
];
