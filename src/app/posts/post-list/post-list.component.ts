import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  /* posts = [
    {
      title: 'First Post',
      content: " This is the first post's contnet",
    },
    {
      title: 'Second Post',
      content: " This is the second post's contnet",
    },
    {
      title: 'third Post',
      content: " This is the third post's contnet",
    },
  ]; */

 @Input() posts :Post[]=[];

}
