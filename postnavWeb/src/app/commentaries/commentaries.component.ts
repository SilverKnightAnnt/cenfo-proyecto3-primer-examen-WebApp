import {Component, Injectable, OnInit} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {PostModel} from '../models/PostModel';
import {PostsService} from '../services/service.service';
import {Router} from '@angular/router';
import {CommentModel} from '../models/CommentModel';

@Component({
  selector: 'app-commentaries',
  templateUrl: './commentaries.component.html',
  styleUrls: ['./commentaries.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class CommentariesComponent implements OnInit {

  public commentaries;
  public userCommentaries;
  public asd: number;
  userModel = new UserModel('', '', []);
  public key: string;
  public postId: number;
  postModel = new PostModel('', '', '', '', this.userModel, []);
  commentModel = new CommentModel('', this.postModel, this.userModel);
  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    this.loadCommentaries();
    this.obtainSessionStorage();
  }

  loadCommentaries() {
    for (let i = 0; i < sessionStorage.length; i++) {
      this.postId = Number(localStorage.key(i));
    }
    this.postsService.getPostCommentaries(this.postId).subscribe( data => {
      this.commentaries = data;
      this.check2();
    });
  }

  submitedData() {

    if (this.isValidForm() === true) {
      this.postModel.id = this.postId;
      this.userModel.id = Number(this.key);
      this.postsService.postComment(this.commentModel);
      location.reload();
    } else {
      document.getElementById('dangerAlert').hidden = false;
      document.getElementById('successAlert').hidden = true;
    }
  }

  obtainActualPost(target) {
    this.postId = target.id;
    localStorage.setItem(target.id.toString(), target.id.toString());
  }

  obtainSessionStorage() {
    for (let i = 0; i < sessionStorage.length; i++) {
      this.key = sessionStorage.key(i);
    }
  }

  editComment(com, target, asd) {
    target.value = com.innerHTML;
    document.getElementById('edit').hidden = false;
    this.asd = asd.id;
  }

  save() {

    if (this.isValidForm() === true) {
      this.commentModel.id = this.asd;
      this.userModel.id = Number(this.key);
      this.postsService.editComment(this.commentModel);
      location.reload();
    } else {
      document.getElementById('dangerAlert').hidden = false;
      document.getElementById('successAlert').hidden = true;
    }
  }

  check2() {
    this.postsService.getUserComments(Number(this.key)).subscribe( data => {
      this.userCommentaries = data;
      for (let i = 0; i < this.commentaries.length; i++) {
        for (let j = 0; j < this.userCommentaries.length; j++) {
          if (this.commentaries[i].id === this.userCommentaries[j].id) {
            const ele = document.getElementById(this.commentaries[i].id);
            ele.hidden = false;
          }
        }
      }
    });
  }

  isValidForm(): boolean {
    let qwe = true;
    const ele = <HTMLInputElement>document.getElementById('commentText');
    if (ele.value === '') {
      ele.classList.add('is-invalid');
      document.getElementById('commentTextMessage').hidden = false;
      qwe = false;
    } else {
      ele.classList.add('is-valid');
      ele.classList.remove('is-invalid');
    }
    return qwe;
  }

}
