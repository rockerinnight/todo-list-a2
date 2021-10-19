import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: ITask;
  taskForm!: FormGroup;
  today!: string;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    if (!this.task) {
      const date = new Date();
      this.today = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      this.taskForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        dueDate: new FormControl(this.today),
        priority: new FormControl('Normal'),
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
    if (this.taskForm.valid) {
      const newTask: ITask = {
        id: this.task
          ? this.task.id
          : Math.floor(Math.random() * Math.pow(10, 6)),
        title: this.taskForm.controls.title.value,
        description: this.taskForm.controls.description.value,
        dueDate: new Date(this.taskForm.controls.dueDate.value),
        priority: this.taskForm.controls.priority.value,
      };
      this.todoService.addOrUpdateTask(newTask);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      dueDate: this.today,
      priority: 'Normal',
    });
  }
}
