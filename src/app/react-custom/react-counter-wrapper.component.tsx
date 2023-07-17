import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import Counter from './Counter';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

const rootDomID: string = "reactCounterWrapperId";

@Component({
    selector: 'react-counter-wrapper',
    template: `<span id="${rootDomID}" #${rootDomID}></span>`,
})
export class ReactCounterWrapperComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    @ViewChild(rootDomID, {static: false}) containerRef: ElementRef | undefined;

    @Input() public counter = 5;
    @Output() public onIncrease = new EventEmitter<void>();

    constructor() {
        this.handleIncrease = this.handleIncrease.bind(this);
        // Or using `private handleIncrease = () => {...}` to eliminate this binding.
    }

    public handleIncrease() {
        if (this.onIncrease) {
            this.onIncrease.emit();
            this.render();
        }
    }

    private getRootDomNode() {
        if (!this.containerRef || !this.containerRef.nativeElement) {
            // const newRootEl = document.createElement("span");
            // newRootEl.setAttribute("id", rootDomID);
            // document.body.appendChild(newRootEl);
            // return newRootEl;
            throw new Error("Cannot get root element. This should not happen.");
        }
        return this.containerRef.nativeElement;
    }

    protected render() {
        if (!this.containerRef || !this.containerRef.nativeElement) return;
        const {counter} = this;
        ReactDOM.render(
            <Counter counter={counter} onIncrease={this.handleIncrease}/>,
            this.getRootDomNode()
        );
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.render();
    }

    ngAfterViewInit() {
        this.render();
    }

    ngOnDestroy() {
        ReactDOM.unmountComponentAtNode(this.getRootDomNode());
    }
}