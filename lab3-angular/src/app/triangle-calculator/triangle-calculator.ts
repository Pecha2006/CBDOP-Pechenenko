
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-triangle-calculator',
  imports: [FormsModule],
  templateUrl: './triangle-calculator.html',
  styleUrl: './triangle-calculator.css'
})
export class TriangleCalculator {
  a: number | null = null;
  b: number | null = null;

  hypotenuse: number | null = null;
  area: number | null = null;
  error = '';

  calculate(): void {
    this.error = '';
    this.hypotenuse = null;
    this.area = null;

    if (
      this.a === null ||
      this.b === null ||
      !Number.isFinite(this.a) ||
      !Number.isFinite(this.b) ||
      this.a <= 0 ||
      this.b <= 0
    ) {
      this.error = 'Введіть два додатні числа!';
      return;
    }

    this.hypotenuse = Math.hypot(this.a, this.b);
    this.area = (this.a * this.b) / 2;
  }
}
