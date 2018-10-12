import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces/post.interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit, OnDestroy {

  @Input() post: Post;

  @Input() show = true;
  @Output() showChange = new EventEmitter<boolean>();

  currentPost: Partial<Post>;
  saving = false;

  private destroyed$ = new Subject();

  constructor(private posts: PostsService) {
  }

  ngOnInit() {
    if (this.post) {
      this.currentPost = this.post;
    } else {
      this.initNewPost();
    }
  }

  initNewPost() {
    this.currentPost = {
      title: '',
      body: '',
    };
  }

  save() {
    this.saving = true;

    this.posts.savePost(this.currentPost)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(() => {
        this.posts.toggleNewPostForm();
        this.close();
      });
  }

  close() {
    this.saving = false;
    this.showChange.emit(false);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
