import { Component, computed, signal } from '@angular/core';
import { GoalCounter } from './goal-counter/goal-counter';
import { TaskCard } from './task-card/task-card';
import { TASKS_DATA } from './tasks-data';
import { Task } from './task-card/task-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [GoalCounter, TaskCard, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly tasks = signal<Task[]>(TASKS_DATA);
  totalCount = computed(() => this.tasks().length);
  completedCount = computed(() => this.tasks().filter((task) => task.status === 'done').length);
  remainingCount = computed(() => this.tasks().filter((task) => task.status !== 'done').length);

  taskTitle = signal<string>('');

  readonly currentTarget = signal<number>(2);
  progress = computed(() => {
    const target = this.currentTarget();
    const completed = this.completedCount();

    if (target <= 0) return 0;

    if (completed >= target) return 100;

    return Math.round((completed / target) * 100);
  });

  resetGoal(): void {
    this.currentTarget.set(2);
  }

  addTask(taskTitle: string): void {
    this.tasks.update((tasks) => [
      {
        id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
        title: taskTitle,
        subject: 'Test',
        status: 'todo',
        priority: 'normal',
      },
      ...tasks,
    ]);

    this.taskTitle.set('');
  }

  handleMoveToNextStep(id: number): void {
    const currentTask = this.tasks().find((task) => task.id === id);

    if (!currentTask) return;

    this.tasks.update((tasks) =>
      tasks.map((task) => {
        if (task.id === currentTask.id) {
          return { ...task, status: this.getNextStatus(task.status) };
        }
        return task;
      }),
    );
  }

  private getNextStatus(status: string): string {
    if (status === 'todo') {
      return 'doing';
    } else if (status === 'doing') {
      return 'done';
    } else if (status === 'done') {
      return 'todo';
    } else {
      return 'invalid status';
    }
  }

  handleDeleteTask(id: number): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
