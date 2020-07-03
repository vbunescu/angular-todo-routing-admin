import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Todo } from '../../shared/interfaces';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  todoForm: FormGroup;
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private alert: AlertService
  ) {
    this.todoForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      author: [null, [Validators.required, Validators.minLength(3)]],
      priority: ['1', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    if (this.todoForm.invalid) {
      return;
    }

    const todo: Todo = {
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      author: this.todoForm.value.author,
      priority: this.todoForm.value.priority,
      date: new Date(),
    };

    this.postsService.create(todo).subscribe(() => {
      this.formDirective.resetForm();
      this.alert.success('ToDo was created');
    });
    // console.log(todo);
  }
}
