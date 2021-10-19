import { Injectable } from '@angular/core';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  tasks: ITask[] = [
    {
      id: 1,
      title: 'todo-1',
      description: 'desc-1',
      dueDate: new Date('2019-10-21'),
      priority: 'Low',
    },
    {
      id: 2,
      title: 'todo-2',
      description: 'desc-1',
      dueDate: new Date('2020-10-21'),
      priority: 'High',
    },
    {
      id: 3,
      title: 'todo-3',
      description: 'desc-1',
      dueDate: new Date('2021-12-08'),
      priority: 'Normal',
    },
  ];

  constructor() {
    this.saveTasks();
    // const localTasks = localStorage.getItem('tasks');
    // if (localTasks) {
    //   this.tasks = JSON.parse(localTasks);
    // }
  }

  getTasks(): ITask[] {
    return this.tasks;
  }

  addOrUpdateTask(task: ITask): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    this.tasks.push(task);
    // this.tasks = this.sortTasksByDate(this.tasks);
    this.saveTasks();
  }

  removeTask(taskId: number): void {
    const newTasks = this.tasks.filter((t) => t.id !== taskId);
    this.tasks = newTasks;
    this.saveTasks();
  }

  private sortTasksByDate(tasks: ITask[]): ITask[] {
    const sortedTasks = tasks
      .slice()
      .sort((a, b) => a.dueDate.valueOf() - b.dueDate.valueOf());
    return sortedTasks;
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
