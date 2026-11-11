
import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import Chart from 'chart.js/auto';
import { Character } from '../services/character';

@Component({
  selector: 'app-character-chart',
  imports: [],
  templateUrl: './character-chart.html',
  styleUrl: './character-chart.css'
})
export class CharacterChart implements AfterViewInit, OnChanges, OnDestroy {

  @Input() characters: Character[] = [];

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characters'] && this.viewReady) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private updateChart(): void {
    if (!this.chartCanvas) {
      return;
    }

    const alive = this.characters.filter(
      character => character.status === 'Alive'
    ).length;

    const dead = this.characters.filter(
      character => character.status === 'Dead'
    ).length;

    const unknown = this.characters.filter(
      character => character.status === 'unknown'
    ).length;

    const canvas = this.chartCanvas.nativeElement;

    if (this.chart) {
      this.chart.data.datasets[0].data = [alive, dead, unknown];
      this.chart.update();
      return;
    }

    this.chart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Живі', 'Мертві', 'Невідомо'],
        datasets: [{
          data: [alive, dead, unknown],
          backgroundColor: ['#4caf50', '#f44336', '#9e9e9e']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}
