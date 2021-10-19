import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinValidator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const date = new Date();
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      dueDate: new FormControl(today),
      priority: new FormControl('Normal'),
    });
  }

  onSubmit(): void {
    console.log(this.taskForm.value);
  }
}
