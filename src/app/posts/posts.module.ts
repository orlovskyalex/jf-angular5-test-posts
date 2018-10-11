import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
  ],
  declarations: [
    PostListComponent,
  ],
})
export class PostsModule {
}
