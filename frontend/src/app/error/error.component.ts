import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error = false;
  errorMSG = "";
  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.error = false
  }

  onOpen(){
    this.error = false
  }

}
