import { isNgTemplate } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Subscription, filter, from, fromEvent, map, of, take, tap, timer } from 'rxjs';
import { iterator } from 'rxjs/internal/symbol/iterator';

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
  subApples! : Subscription;
  sub! : Subscription;
  subTimer!: Subscription;

  ngOnInit(): void {
    const apples$ = from([ // observable
        {id: 1, type: 'macintosh'},
        {id: 2, type: 'gala'},
        {id: 3, type: 'fuji'},
    ])

    this.subApples = apples$ // subscription
      .pipe(
        map(item => ({...item, color: 'red'})),
        tap(item => console.log('Apple:', item))
      )
      .subscribe();

    this.sub = of(2,4,6)
      .pipe(
        filter(item => item % 2 === 0),
        map(item => item * 2),
        tap(item => console.log('Item:', item))
      )
      .subscribe();

      this.subTimer = timer(0,1000).pipe(
        take(5)
      )
      .subscribe(
        {
          next: (item) => console.log('timer', item),
          error: (err) => console.log('err', err),
          complete: ()  => console.log('complete')
        }
      )
  }

  ngOnDestroy(): void {
    this.subApples.unsubscribe();
    this.subTimer.unsubscribe();
  }

  
}

bootstrapApplication(App);
