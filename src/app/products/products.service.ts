import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Response {
    products: Product[]
    total: number
    skip: number
    limit: number
}

export interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    selectedProducts: Product[] = [];

    constructor(private http: HttpClient) {
    }

    fetch(): Observable<Response> {
        return this.http.get<Response>('https://dummyjson.com/products', {
            params: {
                limit: 100
            }
        });
    }
}
