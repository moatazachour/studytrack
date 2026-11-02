import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    checkList: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]),
  });

  get checkListControls() {
    return (this.taskForm.get('checkList') as FormArray).controls;
  }

  addCheckListItem(): void {
    const checkListArray = this.taskForm.get('checkList') as FormArray;
    checkListArray.push(new FormControl(''));
  }

  removeChecklistItem(index: number) {
    const checkListArray = this.taskForm.get('checkList') as FormArray;
    checkListArray.removeAt(index);
  }
}
