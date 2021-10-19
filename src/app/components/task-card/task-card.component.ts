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
  @Output() taskId = new EventEmitter();
  @Output() checked = new EventEmitter();
  detailsIsOpen = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {}

  selectTask(e: any): void {
    if (e.target.checked) {
      this.checked.emit({ checked: true, id: +e.target.value });
    } else {
      this.checked.emit({ checked: false, id: +e.target.value });
    }
  }

  openDetails(): void {
    this.detailsIsOpen = true;
  }

  removeTask(): void {
    this.todoService.removeTask(this.task.id);
    this.taskId.emit(this.task.id);
  }
}
