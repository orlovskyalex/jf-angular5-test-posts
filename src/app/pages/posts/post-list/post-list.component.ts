import { Component, OnInit } from '@angular/core';
import memoize from 'memoize-one';
import { Post } from '../../../shared/interfaces/post.interface';
import { PostsService } from '../../../shared/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  postList$ = this.posts.list$;
  filterValue = '';
  filter = memoize((list: Post[], rawFilter: string): Post[] => {
    const filter = rawFilter.toLowerCase();

    return list.filter((post) => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      return title.includes(filter) || body.includes(filter);
    });
  });

  constructor(private posts: PostsService) {
  }

  ngOnInit() {
    this.posts.getPostList();
  }

  trackByFn(index, post) {
    return post.id;
  }

}
