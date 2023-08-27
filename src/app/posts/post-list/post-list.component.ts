import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
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

  posts: Post[] = [];
  isLoading = false;
  private postSub : Subscription;
  constructor(public postsService: PostService) {}
  ngOnInit() {
    this.isLoading=true;
    this.postsService.getPosts();
    this.postSub=this.postsService.getPostUpdateListner().subscribe((posts: Post[]) => {
      this.isLoading=false;
      this.posts = posts;
    });
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
