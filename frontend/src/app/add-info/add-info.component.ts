import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Rdata } from '../add-info/rData.model';
import { NgForm } from '@angular/forms';
import { AddInfoService } from '../add-info/add-info.service';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";



@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {
  // @Output() addInfo = new EventEmitter<Rdata>();
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  restInput = "Restaurant"
  locInput = "Location"
  emailInput = "Email"
  pNumInput = "Phone Number"
  pwInput = "Password"
  nOtInput = "Num of Tables"

  restVal = ''
  locVal = ''
  emailVal = ''
  pNumVal = ''
  pwVal = ''
  pw2Val = ''

  data = [{title: "Item 1", content:"THIS IS DATA"},
          {title: "Item 2", content:"Like a recipe"},
          {title: "Item 3", content:"OOOOh so delicious"}];

  d2 : any[]= [];

  // labels = ["Restaurant Name", "Location", "Email", "Phone Number", "Password", "Retype Password"];

  labelText = [{label: "Restaurant Name", st: "label1", prompt: "creative restaurant name", tbClass: "t1", inVar: "restVal"},
               {label: "Location", st: "label2", prompt: "123 street road avenue", tbClass: "t2", inVar: "locVal"},
               {label: "Email", st:"label3", prompt:"restaurant_email@domain.com", tbClass: "t3", inVar: "emailVal"},
               {label: "Phone Number", st: "label4", prompt:"123-456-7899", tbClass: "t4", inVar: "pNumVal"},
               {label: "Password", st:"label5", prompt:"creativePassword123", tbClass: "t5", inVar: "pwVal"},
               {label: "Retype Password", st: "label6", prompt:"creativePassword123", tbClass: "t6", inVar: "pw2Val"}
        ]

  constructor(public addInfoService: AddInfoService, private router: Router) { }



  ngOnInit(): void {
    this.userIsAuthenticated = this.addInfoService.getIsAuth();


    this.authListenerSubs = this.addInfoService.getAuthStatiusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
    });
  }


  // onAdd(i: HTMLTextAreaElement){
  //   alert('Added!')
  //   console.dir(i)
  //   this.newInput =  "The user input: " + i.value;
  // }

  // for (i=0; i < labels.length; i++){
  //
  // }

  onAdd(form: NgForm){
    if (form.invalid){
      return;
    }
    this.restInput =  "Entered Data: " + form.value.restVal;

    // this.addInfoService.addData(form.value)
    this.addInfoService.addData(form.value.restVal, form.value.locVal, form.value.emailVal, form.value.pNumVal, form.value.pwVal, form.value.pw2Val)

    form.resetForm();

    //NEEDS TO BE SOME ERROR HANDLING HERE SO THAT IF A USER ENTERS EMAIL THAT IS IN DB, DO NOT GO TO NEXT PAGE
    // this.router.navigate(['/Waitless/Create_Menu'])

  }

  //
  // onAdd(){
  //   this.restInput =  "Restaurant Name: " + this.restVal;
  //   this.locInput =  "Location: " + this.locVal;
  //   this.emailInput =  "Email: " + this.emailVal;
  //   this.pNumInput =  "Phone Number: " + Number(this.pNumVal);
  //   this.pwInput =  "Password: " + this.pwVal;
  //   this.nOtInput =  "Number of tables: " + this.nOtVal;
  //
  //   const rData: Rdata = {
  //     title:  this.restVal,
  //     location:  this.locVal,
  //     email : this.emailVal,
  //     phoneNumber:  Number(this.pNumVal),
  //     password:  this.pwVal,
  //     numTables:  Number(this.nOtVal)
  //   };
  //
  //   this.addInfo.emit(rData);
  // }


}
