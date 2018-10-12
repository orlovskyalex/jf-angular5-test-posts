import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Post } from '../interfaces/post.interface';

@Injectable()
export class PostsService {

  list$ = new BehaviorSubject<Post[]>(null);
  newPostFormOpened$ = new BehaviorSubject<boolean>(false);

  private baseUrl = 'posts/';

  constructor(private http: HttpClient) {
  }

  private get list(): Post[] {
    return this.list$.getValue();
  }

  private set list(list: Post[]) {
    this.list$.next(list);
  }

  getPostList(): void {
    this.request<Post[]>(this.http.get(this.baseUrl))
      .subscribe((response) => {
        this.list = response;
      });
  }

  toggleNewPostForm() {
    this.newPostFormOpened$.next(!this.newPostFormOpened$.getValue());
  }

  savePost(post: Partial<Post>): Observable<Post> {
    // removing the fields we don't want to send
    const { id, userId, ...data } = post;

    let observable: Observable<Post>;

    if (id) {
      const req = this.http.patch(`${this.baseUrl}${id}`, data);

      observable = this.request<Post>(req).pipe(
        tap(response => this.updatePostInList(response)),
      );
    } else {
      const req = this.http.post(
        this.baseUrl,
        {
          ...data,
          userId: 1, // since we don't have any auth...
        },
      );

      observable = this.request<Post>(req).pipe(
        tap(response => this.addPostToList(response)),
      );
    }

    return observable;
  }

  deletePost(id: number): Observable<any> {
    return this.request(this.http.delete(`${this.baseUrl}${id}`))
      .pipe(
        tap(() => this.removePostFromList(id)),
        map(() => true),
      );
  }

  private request<T = any>(req: Observable<any>): Observable<T> {
    return req.pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong
      console.error(
        `Backend returned code ${status}, error was:`,
        Object.keys(error.error).length ? error.error : error,
      );
    }

    // return an observable with a user-facing error message
    return ErrorObservable.create('Something bad happened, please try again later');
  }

  private addPostToList(post: Post): void {
    this.list = this.list.concat(post);
  }

  private updatePostInList(updatedPost: Post): void {
    this.list = this.list.map((post) => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }

      return post;
    });
  }

  private removePostFromList(id: number): void {
    this.list = this.list.filter(post => post.id !== id);
  }

}
