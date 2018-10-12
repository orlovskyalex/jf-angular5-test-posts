import { Component, Input, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Post } from '../../../shared/interfaces/post.interface';
import { PostsService } from '../../../shared/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnDestroy {

  @Input() post: Post;

  private destroyed$ = new Subject();

  constructor(private posts: PostsService) {
  }

  deletePost() {
    this.posts.deletePost(this.post.id)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
