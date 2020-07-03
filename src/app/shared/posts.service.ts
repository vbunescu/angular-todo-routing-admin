import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, FbCreateResponse } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(todo: Todo): Observable<Todo> {
    return this.http.post(`${environment.fbDbUrl}/todos.json`, todo).pipe(
      // chemam metoda pipe si operatorul map care permite sa transforme datele din stream
      map((response: FbCreateResponse) => {
        return {
          ...todo,
          id: response.name,
          date: new Date(todo.date),
        };
      })
    );
  }
  getAll(): Observable<Todo[]> {
    return this.http.get(`${environment.fbDbUrl}/todos.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }

  getById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${environment.fbDbUrl}/todos/${id}.json`).pipe(
      map((todo: Todo) => {
        return {
          ...todo,
          id,
          date: new Date(todo.date),
        };
      })
    );
  }
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/todos/${id}.json`);
  }
  update(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(
      `${environment.fbDbUrl}/todos/${todo.id}.json`,
      todo
    );
  }
}
