import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() todo: Todo;

  constructor() {}

  ngOnInit(): void {}
}
