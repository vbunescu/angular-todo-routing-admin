import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';
import { Todo } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchInput: string;
  searchStr = '';
  searchField = 'title'; // by default

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe((todos) => {
      this.todos = todos;
    });
  }
  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.alert.warning('ToDo was deleted');
    });
  }
  ngOnDestroy() {
    // delete subscription
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
