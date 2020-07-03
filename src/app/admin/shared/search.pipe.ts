import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/shared/interfaces';

@Pipe({
  name: 'searchTodos',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(todos: Todo[], search = '', field: string = 'title'): Todo[] {
    if (!search.trim()) {
      return todos;
    }
    return todos.filter((todo) => {
      return todo[field]
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  }
}
