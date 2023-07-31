import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import Counter from './Counter';

const rootDomID: string = "reactCounterWrapperId";

@Component({
    selector: 'react-counter-wrapper',
    template: `<span id="${rootDomID}" #${rootDomID}></span>`,
})
export class ReactCounterWrapperComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    @ViewChild(rootDomID, {static: false}) containerRef: ElementRef | undefined;

    @Input() public counter = 5;
    @Output() public onIncrease = new EventEmitter<void>();

    public handleIncrease = () => {
        if (this.onIncrease) {
            this.onIncrease.emit();
            this.render();
        }
    }

    private getRootDomNode() {
        if (!this.containerRef || !this.containerRef.nativeElement) {
            throw new Error("Cannot get root element. This should not happen.");
        }
        return this.containerRef.nativeElement;
    }

    protected render() {
        if (!this.containerRef || !this.containerRef.nativeElement) return;
        ReactDOM.render(
            <Counter counter={this.counter} onIncrease={this.handleIncrease}/>,
            this.getRootDomNode()
        );
    }

    ngOnInit() {
        this.render();
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
