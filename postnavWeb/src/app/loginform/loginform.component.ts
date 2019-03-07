import {Component, OnInit} from '@angular/core';
import {PostsService} from '../services/service.service';
import {UserModel} from '../models/UserModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  userModel = new UserModel('', '', []);
  public users;

  constructor(private postsService: PostsService, private router: Router) {
  }

  ngOnInit() {
    sessionStorage.clear();
    this.getAll();
  }


  logIn() {
    this.getAll();
    if (this.isValidForm() === true && this.foundAlready() === true) {
      this.postsService.getUser(this.userModel.nickName).subscribe(data => {
        this.userModel = data;
        sessionStorage.setItem(this.userModel.id.toString(), this.userModel.nickName);
        document.getElementById('dangerAlert').hidden = true;
        document.getElementById('warningAlert').hidden = true;
        this.router.navigate(['Posts/General']);
      });
    } else if (this.isValidForm() === true && this.foundAlready() === false) {
      document.getElementById('dangerAlert').hidden = true;
      document.getElementById('warningAlert').hidden = false;
    } else {
      document.getElementById('dangerAlert').hidden = false;
      document.getElementById('warningAlert').hidden = true;
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
    return qwe;
  }

  getAll() {
    this.postsService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  foundAlready(): boolean {
    let found = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.userModel.nickName === this.users[i].nickName) {
        found = true;
      }
    }
    if (found === false) {
      document.getElementById('warningAlert').hidden = false;
    }
    return found;
  }

}
