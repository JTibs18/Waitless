import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  name = '';
  dummyData = {restaurantName: "JESS TAURANT", location: "101 Food Dr", phoneNum: "9051545444", email: "test@t", numTables: 3, password: "nofsdfsdfds"}
  labelText = [{label: "Restaurant Name", st: "label1", tbClass: "t1", inVar: "restaurantName"},
               {label: "Location", st: "label2", tbClass: "t2", inVar: "location"},
               {label: "Phone Number", st:"label3", tbClass: "t3", inVar: "phoneNum"},
               {label: "Email", st: "label4", tbClass: "t4", inVar: "email"},
               {label: "Number of Tables",st:"label5", tbClass: "t5", inVar: "numTables"},
               {label: "Password", st:"label6", tbClass: "t6", inVar: "password"}]

  constructor(
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.name = paramMap.get('restaurantName');
        });

      this.form = new FormGroup({
        'restaurantName': new FormControl(null, {validators: [Validators.required]}),
        'location': new FormControl(null, {validators: [Validators.required]}),
        'phoneNum': new FormControl(null, {validators: [Validators.required]}),
        'email': new FormControl(null, {validators: [Validators.required]}),
        'numTables': new FormControl(null, {validators: [Validators.required]}),
        'password': new FormControl(null, {validators: [Validators.required]})
      });
  }

  onSave(){
    this.router.navigate(['Waitless/'+ this.name + '/Dashboard']) //need to check db for actual restuarant name
  }

}
