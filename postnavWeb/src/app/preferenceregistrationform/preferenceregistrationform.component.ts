import { Component, OnInit } from '@angular/core';
import { TagModel } from '../models/TagModel';
import {PostsService} from '../services/service.service';

@Component({
  selector: 'app-preferenceregistrationform',
  templateUrl: './preferenceregistrationform.component.html',
  styleUrls: ['./preferenceregistrationform.component.css']
})
export class PreferenceregistrationformComponent implements OnInit {

  tagModel = new TagModel('');
  public tags;
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.getAll();
  }

  submitedData() {
    this.getAll();
    if (this.isValidForm() === true && this.foundAlready() === false) {
      this.postsService.postPreferences(this.tagModel);
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

  isValidForm(): boolean {
    const ele = <HTMLInputElement>document.getElementById('tagName');
    if (ele.value === '') {
      ele.classList.add('is-invalid');
      document.getElementById('tagNameMessage').hidden = false;
      return  false;
    } else {
      ele.classList.add('is-valid');
      ele.classList.remove('is-invalid');
    }

    return true;
  }

  resetForm() {
    const resetForm = <HTMLFormElement>document.getElementById('tagsForm');
    resetForm.reset();
  }

  getAll() {
    this.postsService.getPreferences().subscribe(data => {
      this.tags = data;
    });
  }

  foundAlready(): boolean {
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tagModel.name === this.tags[i].name) {
          document.getElementById('warningAlert').hidden = false;
          return true;
        }
      }
      return false;
  }

}
