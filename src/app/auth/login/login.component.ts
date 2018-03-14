import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.models';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message :Message;

  constructor( 
    private userService: UserService, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.message = new Message('danger',''); 
    this.form = new FormGroup({
      'email': new FormControl(null, [ Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  private ShowMessage(text: string, type: string = 'danger'){
    this.message = new Message(type,text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(){
    const formData = this.form.value;

    this.userService.getUserByEmail(formData.email)
    .subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          //this.router.navigate(['']);
        } else {
          this.ShowMessage('Incorrect password'); 
        }
      } else {
        this.ShowMessage("Such a user does not exist");
      }
    });
  }

}
