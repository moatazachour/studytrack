import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  taskForm = new FormGroup({
    title: new FormControl(''),
    subject: new FormControl(''),
    courseCode: new FormControl(''),
    priority: new FormControl('normal'),
    status: new FormControl({ value: 'todo', disabled: true }),
    studyDetails: new FormGroup({
      estimatedMinutes: new FormControl(30),
      notes: new FormControl(''),
    }),
  });
}
