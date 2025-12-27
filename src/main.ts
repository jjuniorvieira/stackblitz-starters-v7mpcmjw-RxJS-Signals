import { Component, OnDestroy, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App implements OnInit, OnDestroy {
  name = 'JJ Angular';
  sub! : Subscription;

  ngOnInit(): void {
    this.sub = of(2,4,6,8).subscribe(item => console.log('value from of:', item))
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
}

bootstrapApplication(App);
