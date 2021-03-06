import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostListComponent } from './post-list/post-list.component';
import { ToolbarComponent } from './post-list/toolbar/toolbar.component';
import { PostComponent } from './post/post.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostFormComponent } from './post-form/post-form.component';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
  ],
  declarations: [
    PostListComponent,
    PostComponent,
    ToolbarComponent,
    PostFormComponent,
  ],
})
export class PostsModule {
}
