import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddInfoService } from "../add-info/add-info.service";
import { Subscription } from "rxjs";

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
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  error = false;
  errorMSG = "";


  constructor(
    private router: Router,
    public addInfoService: AddInfoService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.addInfoService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        //
        // if (this.userIsAuthenticated == true) {
        //   // this.router.navigate(['Waitless/' + this.restName + '/Dashboard']) //need to check db for actual restuarant name
        // }
    });
  }

  onSignIn(form: NgForm){
    if(form.invalid){
      this.error = true;
      this.errorMSG = "Error: Invalid email and password. Please try entering your credentials again";
      return
    }
    this.restName = form.value.userName;
    this.pw = form.value.password;

    this.addInfoService.login(this.restName, this.pw)

    form.resetForm();

  }

  onCreateNewAccount(){
    this.router.navigate(['/Waitless/Registration'])

  }

  onClose(){
    this.error = false
  }

}
