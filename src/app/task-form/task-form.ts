import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const forbidden = nameRe.test(value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      forbiddenNameValidator(/test/i),
    ]),
    subject: new FormControl('', Validators.required),
    courseCode: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}$/)]),
    priority: new FormControl('normal'),
    status: new FormControl({ value: 'todo', disabled: true }),
    studyDetails: new FormGroup({
      estimatedMinutes: new FormControl(30, [Validators.required, Validators.pattern(/^\d+$/)]),
      notes: new FormControl('', Validators.maxLength(120)),
    }),
    checkList: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]),
  });

  get checkListControls(): FormControl[] {
    return (this.taskForm.get('checkList') as FormArray).controls as FormControl[];
  }

  get courseCode() {
    return this.taskForm.get('courseCode');
  }

  get estimatedMinutes(): AbstractControl | null {
    return this.taskForm.get('studyDetails.estimatedMinutes');
  }

  addCheckListItem(): void {
    const checkListArray = this.taskForm.get('checkList') as FormArray;
    checkListArray.push(new FormControl('', Validators.required));
  }

  removeChecklistItem(index: number) {
    const checkListArray = this.taskForm.get('checkList') as FormArray;
    checkListArray.removeAt(index);
  }
}
