import {Component} from '@angular/core';
import {ProductsService} from './products.service';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    constructor(public productService: ProductsService) {
    }
}