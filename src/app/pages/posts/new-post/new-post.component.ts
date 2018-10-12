import { Component, OnDestroy } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnDestroy {

  show$ = this.posts.newPostFormOpened$;
  title = '';
  body = '';
  creating = false;

  private destroyed$ = new Subject();

  constructor(private posts: PostsService) {
  }

  createPost() {
    const { title, body } = this;
    const post = {
      title,
      body,
    };

    this.creating = true;

    this.posts.createPost(post)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(() => {
        this.posts.toggleNewPostForm();
        this.creating = false;
        this.clearForm();
      });
  }

  clearForm() {
    this.title = '';
    this.body = '';
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
