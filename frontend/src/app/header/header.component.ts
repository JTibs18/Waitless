import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { AddInfoService } from "../add-info/add-info.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  mode = '';
  name = '';
  tableNum = '';
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  constructor(
    private addInfoService: AddInfoService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('tableNumber')){
          this.mode = 'default';
          this.tableNum = paramMap.get('tableNumber'); 
        }else if(paramMap.has('restaurantName')){
          this.mode = 'dash';
          this.name = paramMap.get('restaurantName');
          this.name = this.name.replace("_", " ");
        }
        else{
          this.mode='blank'
        }
        });

        this.userIsAuthenticated = this.addInfoService.getIsAuth();

        this.authListenerSubs = this.addInfoService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
  }

  onLogout(){
    this.addInfoService.logout();
    // this.router.navigate(['/Waitless'])

  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
