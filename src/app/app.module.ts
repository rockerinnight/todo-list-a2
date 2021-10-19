import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    NewTaskComponent,
    TaskCardComponent,
    TaskListComponent,
    TodoListComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
