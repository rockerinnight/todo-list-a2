import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ITask } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';
import { PRIORITIES } from 'src/app/shared/const';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: ITask;
  taskForm!: FormGroup;
  today!: string;
  priorities: any[] = PRIORITIES;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.today = moment().format('YYYY-MM-DD');
    if (!this.task) {
      this.taskForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        dueDate: new FormControl(this.today),
        priority: new FormControl(this.priorities[1].value),
      });
    } else {
      this.taskForm = new FormGroup({
        title: new FormControl(this.task.title, [Validators.required]),
        description: new FormControl(this.task.description),
        dueDate: new FormControl(this.task.dueDate),
        priority: new FormControl(this.task.priority),
      });
    }
  }

  onSubmit(): void {
    if (!this.taskForm.valid) {
      return console.log('Failed to create a task!');
    }

    const newTask: ITask = {
      id: this.task
        ? this.task.id
        : Math.floor(Math.random() * Math.pow(10, 6)),
      title: this.taskForm.controls.title.value,
      description: this.taskForm.controls.description.value,
      dueDate: this.taskForm.controls.dueDate.value,
      priority: this.taskForm.controls.priority.value,
    };
    this.todoService.addOrUpdateTask(newTask);
    this.resetForm();
  }

  resetForm(): void {
    this.today = moment().format('YYYY-MM-DD');
    this.taskForm.reset({
      title: '',
      description: '',
      dueDate: this.today,
      priority: this.priorities[1].value,
    });
  }
}
