import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = ''
  password = ''
  restName = ''
  pw=''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSignIn(form: NgForm){
    if(form.invalid){
      return
    }
    this.restName = form.value.userName;
    this.pw = form.value.password;


    form.resetForm();
    // this.router.navigate(['/Waitless/Dashboard'])
  }

  onCreateNewAccount(){
    this.router.navigate(['/Waitless/Registration'])

  }

}
