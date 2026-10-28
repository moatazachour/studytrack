import { Component, computed, signal } from '@angular/core';
import { GoalCounter } from './goal-counter/goal-counter';
import { TaskCard } from './task-card/task-card';
import { TASKS_DATA } from './tasks-data';
import { Task } from './task-card/task-model';

@Component({
  selector: 'app-root',
  imports: [GoalCounter, TaskCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  tasks = signal<Task[]>(TASKS_DATA);
  totalCount = computed(() => this.tasks().length);
  completedCount = computed(() => this.tasks().filter((task) => task.status === 'done').length);
  remainingCount = computed(() => this.tasks().filter((task) => task.status !== 'done').length);
}
