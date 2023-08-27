import { Subject, map } from 'rxjs';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  constructor(private Http: HttpClient, private router : Router) {}

  getPosts() {
    this.Http.get<{ message: string; posts: any }>(
      'http://localhost:3000/api/posts'
    )
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedposts) => {
        this.posts = transformedposts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListner() {
    return this.postUpdated.asObservable();
  }

  getPost(id: string) {
    return this.Http.get<{_id:string, title:string, content:string}>("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.Http.post<{ message: string; postId: string }>(
      'http://localhost:3000/api/posts',
      post
    ).subscribe((responseData) => {
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.Http.put('http://localhost:3000/api/posts/' + id, post).subscribe(
      (response) => {
       const updatedPosts = [...this.posts];
       const oldPostIndex = updatedPosts.findIndex(p=> p.id === post.id);
       updatedPosts[oldPostIndex]= post;
       this.posts = updatedPosts;
       this.postUpdated.next([...this.posts]);
       this.router.navigate(["/"]);
      }
    );
  }

  deletePost(postId: string) {
    this.Http.delete('http://localhost:3000/api/posts/' + postId).subscribe(
      () => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      }
    );
  }
}
