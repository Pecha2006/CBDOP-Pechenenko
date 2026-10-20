
import { Component } from '@angular/core';
import { TriangleCalculator } from './triangle-calculator/triangle-calculator';

@Component({
  selector: 'app-root',
  imports: [TriangleCalculator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
