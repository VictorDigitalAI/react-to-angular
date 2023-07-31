import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Select from 'react-select';
import {Product, ProductsService} from '../products/products.service';

const rootDomID: string = "reactSelectWrapperId";

@Component({
    selector: 'react-selector-wrapper',
    template: `
        <div id="${rootDomID}" #${rootDomID}></div>
        <ul>
            <li *ngFor="let item of listOfSelections">{{item}}</li>
        </ul>
    `,
})
export class ReactSelectorWrapperComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

    @ViewChild(rootDomID, {static: false}) containerRef: ElementRef | undefined;

    listOfSelections: string[] = [];
    options: {value: Product, label: string}[] = [];

    constructor(private productService: ProductsService) {
    }

    ngOnInit(): void {
        this.productService.fetch().subscribe(res => {
            this.options = res.products.map(p => ({value: p, label: p.title}));
            this.render();
        });
    }

    private getRootDomNode() {
        if (!this.containerRef || !this.containerRef.nativeElement) {
            throw new Error("Cannot get root element. This should not happen.");
        }
        return this.containerRef.nativeElement;
    }

    private handleSelection = (value: any) => {
        this.listOfSelections.push(value.label);
        this.productService.selectedProducts.push(value.value);
    }

    protected render() {

        if (!this.containerRef || !this.containerRef.nativeElement) return;
        ReactDOM.render(
            <Select options={this.options} onChange={this.handleSelection} placeholder="Select next product"/>,
            this.getRootDomNode()
        );
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
