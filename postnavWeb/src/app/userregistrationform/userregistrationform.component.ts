import {Component, OnInit} from '@angular/core';
import {PostsService} from '../services/service.service';
import {UserModel} from '../models/UserModel';
import {TagModel} from '../models/TagModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-userregistrationform',
  templateUrl: './userregistrationform.component.html',
  styleUrls: ['./userregistrationform.component.css']
})
export class UserregistrationformComponent implements OnInit {

  public preferences;
  public users;
  userModel = new UserModel('', '', []);

  constructor(private postsService: PostsService, private router: Router) {
  }

  ngOnInit() {
    this.loadPreferences();
    this.getAll();
  }

  loadPreferences() {
    this.postsService.getPreferences().subscribe(data => {
      this.preferences = data;
    });
  }

  submitedData() {
    this.getAll();
    if (this.isValidForm() === true && this.foundAlready() === false) {
      this.userModel.status = 'Activo';
      this.postsService.postUsers(this.userModel);
      document.getElementById('successAlert').hidden = false;
      document.getElementById('dangerAlert').hidden = true;
      document.getElementById('warningAlert').hidden = true;
      this.resetForm();
    } else if (this.isValidForm() === true && this.foundAlready() === true) {
      document.getElementById('dangerAlert').hidden = true;
    } else {
      document.getElementById('dangerAlert').hidden = false;
      document.getElementById('warningAlert').hidden = true;
      document.getElementById('successAlert').hidden = true;
    }
  }

  toggleEditable(event) {
    const items = document.getElementsByTagName('INPUT');
    for (let i = 1; i < items.length; i++) {
      if (event[i].checked === true) {
        const tagModel = new TagModel('');
        tagModel.constructor2(event[i].value);
        this.userModel.tags.push(tagModel);
      }
    }
  }

  isValidForm(): boolean {
    let qwe = true;
    const ele = <HTMLInputElement>document.getElementById('userName');
    if (ele.value === '') {
      ele.classList.add('is-invalid');
      document.getElementById('userNameMessage').hidden = false;
      qwe = false;
    } else {
      ele.classList.add('is-valid');
      ele.classList.remove('is-invalid');
    }

    if (this.userModel.tags.length === 0) {
      document.getElementById('tagsMessage').hidden = false;
      qwe = false;
    }

    return qwe;
  }

  resetForm() {
    const resetForm = <HTMLFormElement>document.getElementById('userForm');
    resetForm.reset();
  }

  getAll() {
    this.postsService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  foundAlready(): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (this.userModel.nickName === this.users[i].nickName) {
        document.getElementById('warningAlert').hidden = false;
        return true;
      }
    }
    return false;
  }
}
