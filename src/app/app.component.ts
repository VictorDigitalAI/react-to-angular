import {Component} from '@angular/core';
import * as React from 'react';

window.React = React;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public counter = 678;

    public handleOnChildClick(): void {
        this.counter++;
    }
}
