import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  taskList: ITask[] = [];
  checkedTaskIds: number[] = [];

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.taskList = this.todoService.getTasks();
  }

  getCheckedTaskIds(checkedIdList: number): void {
    this.checkedTaskIds.push(checkedIdList);
  }

  removeCheckedTasks(): void {
    this.checkedTaskIds.forEach((id) => this.todoService.removeTask(id));
    this.checkedTaskIds.length = 0;
  }
}
