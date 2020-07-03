import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../shared/posts.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  minDateEdit = new Date();
  form: FormGroup;
  todo: Todo;
  submitted: false;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id']);
        })
      )
      .subscribe((todo: Todo) => {
        this.todo = todo;
        this.form = new FormGroup({
          title: new FormControl(todo.title, Validators.required),
          description: new FormControl(todo.description, Validators.required),
          author: new FormControl(todo.author, Validators.required),
          priority: new FormControl(todo.priority, Validators.required),
          date: new FormControl(new Date(), Validators.required),
        });
      });
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = false;

    this.uSub = this.postsService
      .update({
        id: this.todo.id,
        title: this.form.value.title,
        description: this.form.value.description,
        author: this.form.value.author,
        priority: this.form.value.priority,
        date: this.form.value.date,
      })
      .subscribe(() => {
        this.submitted = false;
        this.alert.success('ToDo was editted');
      });
  }
}
