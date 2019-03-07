import { Component, OnInit } from '@angular/core';
import {UserModel} from '../models/UserModel';
import {PostsService} from '../services/service.service';
import {Router} from '@angular/router';
import {TagModel} from '../models/TagModel';
import {PostModel} from '../models/PostModel';

@Component({
  selector: 'app-postsregistrationform',
  templateUrl: './postsregistrationform.component.html',
  styleUrls: ['./postsregistrationform.component.css']
})
export class PostsregistrationformComponent implements OnInit {

  public preferences;
  public posts;
  userModel = new UserModel('', '', []);
  public key: string;
  postModel = new PostModel('', '', '', '', this.userModel, []);
  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    this.loadPreferences();
    this.getAll();
    this.obtainSessionStorage();
  }

  loadPreferences() {
    this.postsService.getPreferences().subscribe( data => {
      this.preferences = data;
    });
  }

  submitedData() {
    this.getAll();
    if (this.isValidForm() === true && this.foundAlready() === false) {
      this.postModel.status = 'Activo';
      this.postModel.image = 'Default image';
      this.postsService.postPosts(this.postModel);
      document.getElementById('successAlert').hidden = false;
      document.getElementById('dangerAlert').hidden = true;
      document.getElementById('warningAlert').hidden = true;
      this.resetForm();
    } else if (this.isValidForm() === true && this.foundAlready() === true) {
      document.getElementById('dangerAlert').hidden = true;
      this.postModel.tags = [];
    } else {
      document.getElementById('dangerAlert').hidden = false;
      document.getElementById('warningAlert').hidden = true;
      document.getElementById('successAlert').hidden = true;
      this.postModel.tags = [];
    }
  }

  obtainSessionStorage() {
    for (let i = 0; i < sessionStorage.length; i++) {
      this.key = sessionStorage.key(i);
    }
  }

  toggleEditable(event) {
    const items = document.getElementsByTagName('INPUT');
    for (let i = 1; i  <= items.length; i++) {
      if (event[i].checked === true) {
        const tagModel = new TagModel('');
        this.userModel.id = Number(this.key);
        tagModel.constructor2(event[i].value);
        this.postModel.tags.push(tagModel);
      }
    }
  }

  isValidForm(): boolean {
    let qwe = true;
    const ele = <HTMLInputElement>document.getElementById('postTitle');
    const ele2 = <HTMLInputElement>document.getElementById('postText');
    if (ele.value === '') {
      ele.classList.add('is-invalid');
      document.getElementById('postTitleMessage').hidden = false;
      qwe = false;
    } else {
      ele.classList.add('is-valid');
      ele.classList.remove('is-invalid');
    }

    if (ele2.value === '') {
      ele2.classList.add('is-invalid');
      document.getElementById('postTextMessage').hidden = false;
      qwe = false;
    } else {
      ele2.classList.add('is-valid');
      ele2.classList.remove('is-invalid');
    }

    if (this.postModel.tags.length === 0) {
      document.getElementById('tagsMessage').hidden = false;
      qwe = false;
    }

    return qwe;
  }

  resetForm() {
    const resetForm = <HTMLFormElement>document.getElementById('postsForm');
    resetForm.reset();
    this.postModel = new PostModel('', '', '', '', this.userModel, []);
  }

  getAll() {
    this.postsService.getAllPosts().subscribe(data => {
      this.posts = data;
    });
  }

  foundAlready(): boolean {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.postModel.title === this.posts[i].title) {
        document.getElementById('warningAlert').hidden = false;
        return true;
      }
    }
    return false;
  }

}
