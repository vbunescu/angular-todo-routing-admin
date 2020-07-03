import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../shared/posts.service';
import { Todo } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  todo$: Observable<Todo>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.todo$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      })
    );
  }
}
