import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    //ActivatedRoute holds all metadata regarding the currently loaded route
  }

  ngOnInit(): void {
    //this snapshot will initialize when component is first routed to.
    //but it won't register subsequent routes to this already loaded comp.
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    //this observable will catch all subsequent routes
    this.paramSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
