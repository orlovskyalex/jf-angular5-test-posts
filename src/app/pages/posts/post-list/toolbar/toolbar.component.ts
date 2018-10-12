import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PostsService } from '../../../../shared/services/posts.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input() filter: string;
  @Output() filterChange = new EventEmitter<string>();

  newPostOpened$ = this.posts.newPostFormOpened$;

  private input$ = new Subject<string>();
  private destroyed$ = new Subject();

  constructor(private posts: PostsService) {
  }

  ngOnInit() {
    this.input$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
      )
      .subscribe((value) => {
        this.filterChange.emit(value);
      });
  }

  handleChange(value) {
    this.input$.next(value);
  }

  toggleNewPost() {
    this.posts.toggleNewPostForm();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

}
