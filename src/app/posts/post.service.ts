import { Subject } from "rxjs";
import { Post } from "./post.model";
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({providedIn: 'root'})
export class PostService{
   private posts: Post[] = [];
   private postUpdated = new Subject<Post[]>();
constructor(private Http: HttpClient){}

   getPosts(){
    this.Http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData)=>{
     this.posts= postData.posts;
     this.postUpdated.next([...this.posts]);
    });
   }

   getPostUpdateListner(){
    return this.postUpdated.asObservable();
   }

   addPost(title:string, content: string){
        const post: Post = {id:null,title: title, content:content};
        this.Http.post<{message:string}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
         console.log(responseData.message);
         this.posts.push(post);
         this.postUpdated.next([...this.posts]);
        });
       
   }
}