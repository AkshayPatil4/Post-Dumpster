import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { NgForm} from "@angular/forms"
import { PostService } from '../post.service';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  newPost = 'No Content';
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId:string;
   post :Post;
 
  constructor( public postService: PostService , public route: ActivatedRoute){}

ngOnInit(): void {
  this.route.paramMap.subscribe((paramMap)=>{
    if(paramMap.has('postId')){
      this.mode= 'edit';
      this.postId= paramMap.get('postId');
      this.post = this.postService.getPost(this.postId);
    }
    else{
      this.mode='create';
      this.postId= null;
    }
  });
}

  onSavePost(form:NgForm) {
    if (form.invalid){
      return;
    }
    if (this.mode === 'create'){
      this.postService.addPost(form.value.title, form.value.content);
    }
    else{
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
    }
    
    form.resetForm();
  }
}
