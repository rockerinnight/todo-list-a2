import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() tasks!: ITask[];
  @Output() sendCheckedTaskIds = new EventEmitter();
  checkedTaskIds: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  getTaskId(e: Event): void {
    const taskId = e;
    this.tasks = this.tasks.filter(
      (t) => t.id !== (taskId as unknown as number)
    );
  }

  getCheckedTask(e: Event): void {
    const checkedTask = e as any;
    if (checkedTask.checked) {
      this.checkedTaskIds.push(checkedTask.id);
    } else {
      this.checkedTaskIds = this.checkedTaskIds.filter(
        (id) => id !== checkedTask.id
      );
    }
    this.sendCheckedTaskIds.emit(this.checkedTaskIds);
  }
}
