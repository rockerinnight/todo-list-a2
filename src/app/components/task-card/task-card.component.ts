import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task!: ITask;
  @Output() checkedTaskId = new EventEmitter();
  detailsIsOpen = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {}

  selectTask(event: any): void {
    if (!event.target.checked) {
      return;
    }
    this.checkedTaskId.emit(this.task.id);
  }

  openDetails(): void {
    this.detailsIsOpen = !this.detailsIsOpen;
  }

  removeTask(): void {
    this.todoService.removeTask(this.task.id);
  }
}
