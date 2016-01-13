import { Component, EventEmitter, ViewEncapsulation, Input } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

@Component({
    selector: 'countdown',
    template: '<h1>Time left: {{seconds}}</h1>',
    encapsulation: ViewEncapsulation.Emulated,
    outputs: ['onComplete: countdownComplete', 'secondsChanged: seconds']
})
class Countdown {
    @Input() seconds: number;
    intervalId: any; // The TypeScript compiler may complain when the intervalId is type as number
    onComplete: EventEmitter<any> = new EventEmitter();
    secondsChanged: EventEmitter<number> = new EventEmitter();

    constructor() {
        this.intervalId = setInterval(() => this.countDownSeconds(), 1000);
    }

    countDownSeconds(): void {
        if (--this.seconds < 1) {
            clearTimeout(this.intervalId);
            this.onComplete.next(null);
        }
        this.secondsChanged.next(this.seconds);
    }
}

@Component({
    selector: 'pomodoro-timer',
    directives: [Countdown],
    encapsulation: ViewEncapsulation.None,
    template: `<countdown [seconds]="timeout" #timer
                               (seconds)="timeout = $event"
                               (countdownComplete)="onCountdownCompleted()"></countdown>
               <p (click)="timer.seconds = 50">Only <strong>{{timeout}} seconds</strong> left. Click me to reset countdown to 50 seconds.</p>`
})
class PomodoroTimer {
    timeout: number = 10;
    onCountdownCompleted(): void {
        alert('Time up!');
    }
}

bootstrap(PomodoroTimer);
