import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

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
  totalPosts=0;
  postPerPage= 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private postSub : Subscription;
  constructor(public postsService: PostService) {}
  ngOnInit() {
    this.isLoading=true;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.postSub=this.postsService.getPostUpdateListner().subscribe((postData: {posts:Post[], postCount:number}) => {
      this.isLoading=false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }

  onChangedPage(pageData :PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex +1;
    this.postPerPage= pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
  }

  onDelete(postId:string){
    this.isLoading=true;
     this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postPerPage,this.currentPage);
    });
  }

  ngOnDestroy(): void
 {
    this.postSub.unsubscribe();
  }
}
