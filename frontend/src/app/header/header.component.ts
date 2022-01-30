import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mode = '';
  name = '';

  constructor(
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('restaurantName')){
          this.mode = 'dash';
          this.name = paramMap.get('restaurantName');
          this.name = this.name.replace("_", " "); 

        }else{
          this.mode = 'default';
        }

  });



  }
}
