import { isNgTemplate } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Subscription, from, fromEvent, of } from 'rxjs';

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
  subArray! : Subscription;
  subFrom! : Subscription;
  subEvent! : Subscription;

  ngOnInit(): void {
    this.sub = of(2,4,6,8).subscribe(item => console.log('value from of:', item))
    this.subArray = of([2,4,6,8]).subscribe(item => console.log('value from array:', item))
    this.subFrom = from([13,14,15,6]).subscribe({
      next: item => console.log('value from from', item),
      error: err => console.log('error', err),
      complete: () => console.log('complete from')
    });
    this.subEvent = fromEvent(document, 'click').subscribe({
      next: event => console.log('value from event', event.target),
      error: err => console.log('error from event', err),
      complete: () => console.log('complete from event')
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subArray.unsubscribe();
    this.subFrom.unsubscribe();
    this.subEvent.unsubscribe();
  }
  
}

bootstrapApplication(App);
