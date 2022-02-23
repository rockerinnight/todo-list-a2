import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() taskList!: ITask[];
  @Output() sendCheckedTaskIds = new EventEmitter();

  getCheckedTaskId(taskId: number): void {
    this.sendCheckedTaskIds.emit(taskId);
  }
}
