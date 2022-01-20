import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';

const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: "100%",
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [

      // transition from left to right in tabs!
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(":leave", [
            animate('200ms ease-in', style({
              opacity: '0',
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: '0',
              transform: 'translateX(50px)'
            }),
            animate('250ms 100ms ease-out', style({
              opacity: '1',
              transform: 'translateX(0px)'
            }))
          ], { optional: true })
        ]),
      ]),

      // transition from right to left in tabs!
      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(":leave", [
            animate('200ms ease-in', style({
              opacity: '0',
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: '0',
              transform: 'translateX(-50px)'
            }),
            animate('250ms 100ms ease-out', style({
              opacity: '1',
              transform: 'translateX(0px)'
            }))
          ], { optional: true })
        ]),
      ]),

      // transition from tabs to edit or add
      transition('* => secondary', [
        style({
          position: 'relative',
        }),
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(":leave", [
            animate('250ms ease-in', style({
              opacity: '0',
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: '0',
              transform: 'scale(1.2)'
            }),
            animate('300ms 125ms ease-out', style({
              opacity: '1',
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ]),
      ]),

      // transition back from -edit or add- to tabs
      transition('secondary => *', [
        style({
          position: 'relative',
        }),
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(":leave", [
            animate('250ms ease-in', style({
              opacity: '0',
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              opacity: '0',
              transform: 'scale(.8)'
            }),
            animate('300ms 125ms ease-out', style({
              opacity: '1',
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ]),
      ]),

    ]),
    trigger('bgAnim', [
      transition(':leave', animate(1000, style({
        opacity: '0'
      })))
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(250, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Angular Dashboard';
  backgrounds: string[] =
    ['https://images.unsplash.com/photo-1641327524708-0246aa928f16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'];

  loadingBfImage: boolean;
  dateTime: Date

  constructor() {
  }

  ngOnInit(): void {
    timer(0, 1000).subscribe(() => {
      this.dateTime = new Date()
    })
  }

  prepareRouter(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab'];
      if (!tab) return 'secondary'
      return tab
    }

  }
  async changeBgImage(): Promise<any> {
    this.loadingBfImage = true;
    const result = await fetch('http://source.unsplash.com/random/1920*1080', {
      method: 'HEAD'
    })

    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      return this.changeBgImage()
    }
    this.backgrounds.push(result.url)
  }
  onBgImgLoad(imgEvent: Event) {
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)

    setTimeout(() => {
      this.loadingBfImage = false;
    }, 5000);

  }
}
