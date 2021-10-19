import { Injectable } from '@angular/core';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  tasks: ITask[] = [];

  constructor() {
    // this.saveTasks();
    const localTasks = localStorage.getItem('tasks');
    if (localTasks) {
      this.tasks = JSON.parse(localTasks);
    }
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
