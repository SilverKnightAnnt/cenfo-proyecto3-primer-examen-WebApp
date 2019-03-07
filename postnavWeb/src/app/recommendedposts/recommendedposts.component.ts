import { Component, OnInit } from '@angular/core';
import {PostsService} from '../services/service.service';
import {LikeModel} from '../models/LikeModel';
import {UserModel} from '../models/UserModel';
import {PostModel} from '../models/PostModel';
import {CommentariesComponent} from '../commentaries/commentaries.component';

@Component({
  selector: 'app-recommendedposts',
  templateUrl: './recommendedposts.component.html',
  styleUrls: ['./recommendedposts.component.css']
})
export class RecommendedpostsComponent implements OnInit {

  key: string;
  public posts;
  public likedPosts;
  user = new UserModel('', '', []);
  post = new PostModel('', '', '', '', this.user, []);
  likes = new LikeModel(this.user, this.post);
  constructor(private postsService: PostsService, private comment: CommentariesComponent) { }

  ngOnInit() {
    this.obtainSessionStorage();
    this.loadPosts();
  }

  loadPosts() {
    this.postsService.getRecommendedPosts(this.key).subscribe( data => {
      this.posts = data;
      this.check();
    });
  }

  obtainSessionStorage() {
    for (let i = 0; i < sessionStorage.length; i++) {
      this.key = sessionStorage.key(i);
    }
  }

  check() {
    this.postsService.getLikedPosts(this.key).subscribe( data => {
      this.likedPosts = data;
      this.check2();
    });
  }

  check2() {
    for (let i = 0; i < this.posts.length; i++) {
      for (let j = 0; j < this.likedPosts.length; j++) {
        if (this.posts[i].id === this.likedPosts[j].id) {
          const ele = document.getElementById(this.posts[i].id);
          ele.style.color = '#0984e3';
        }
      }
    }
  }

  likeAction(target) {
    this.user.id = Number(this.key);
    this.post.id = target.id;
    this.likes = new LikeModel(this.user, this.post);
    if (target.style.color === 'rgb(9, 132, 227)') {
      this.postsService.deleteLikes(this.likes);
    } else {
      this.postsService.postLikes(this.likes);
    }
    location.reload();
  }

  commentAction(target) {
    this.comment.obtainActualPost(target);
  }

}
