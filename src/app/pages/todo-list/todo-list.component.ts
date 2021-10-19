import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  tasks!: ITask[];
  checkedTaskIds: number[] = [];

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.tasks = this.todoService.getTasks();
  }

  getCheckedTaskIds(e: Event): void {
    this.checkedTaskIds = e as unknown as number[];
  }

  removeCheckedTasks(): void {
    this.checkedTaskIds.forEach((id) => {
      this.todoService.removeTask(id);
      this.tasks = this.tasks.filter((t) => t.id !== id);
    });
    this.checkedTaskIds = [];
  }
}
