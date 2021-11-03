import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {
  restInput = "Restaurant"
  locInput = "Location"
  emailInput = "Email"
  pNumInput = "Phone Number"
  pwInput = "Password"
  nOtInput = "Num of Tables"

  prompt = "Please enter some shit"
  restVal = ''
  locVal = ''
  emailVal = ''
  pNumVal = ''
  pwVal = ''
  nOtVal = ''

  data = [{title: "Item 1", content:"THIS IS DATA"},
          {title: "Item 2", content:"Like a recipe"},
          {title: "Item 3", content:"OOOOh so delicious"}];

  labels = ["Restaurant Name", "Location", "Email", "Phone Number", "Password", "Retype Password", "Number of Tables"]


  constructor() { }

  ngOnInit(): void {
  }


  // onAdd(i: HTMLTextAreaElement){
  //   alert('Added!')
  //   console.dir(i)
  //   this.newInput =  "The user input: " + i.value;
  // }
  onAdd(){
    // for (i=0; i < labels.length; i++){
    //
    // }
    this.restInput =  "Restaurant Name: " + this.restVal;
    this.locInput =  "Location: " + this.locVal;
    this.emailInput =  "Email: " + this.emailVal;
    this.pNumInput =  "Phone Number: " + this.pNumVal;
    this.pwInput =  "Password: " + this.pwVal;
    this.nOtInput =  "Number of tables: " + this.nOtVal;

  }
}
