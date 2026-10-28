import { Component, input, output } from '@angular/core';
import { Task } from './task-model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  readonly task = input.required<Task>();
  readonly moveToNextStep = output<number>();
  readonly deleteTask = output<number>();

  onNextStep(): void {
    this.moveToNextStep.emit(this.task().id);
  }

  onDelete(): void {
    this.deleteTask.emit(this.task().id);
  }
}
