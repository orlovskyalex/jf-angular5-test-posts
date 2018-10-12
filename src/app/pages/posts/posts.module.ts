import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
  ],
  declarations: [
    PostListComponent,
    PostComponent,
  ],
})
export class PostsModule {
}
