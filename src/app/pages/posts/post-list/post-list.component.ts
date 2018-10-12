import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  postList$ = this.posts.list$;

  constructor(private posts: PostsService) {
  }

  ngOnInit() {
    this.posts.getPostList();
  }

  trackByFn(index, post) {
    return post.id;
  }

}
