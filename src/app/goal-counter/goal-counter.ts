import { Component, model } from '@angular/core';

@Component({
  selector: 'app-goal-counter',
  imports: [],
  templateUrl: './goal-counter.html',
  styleUrl: './goal-counter.css',
})
export class GoalCounter {
  readonly target = model<number>(2);
  minTarget: number = 1;
  maxTarget: number = 5;

  decreaseTarget(): void {
    if (this.target() === this.minTarget) return;

    this.target.update((t) => t - 1);
  }

  increaseTarget(): void {
    if (this.target() === this.maxTarget) return;

    this.target.update((t) => t + 1);
  }
}
