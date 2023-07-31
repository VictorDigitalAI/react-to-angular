import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsComponent} from './products/products.component';
import {DxDataGridModule} from 'devextreme-angular';
import {HttpClientModule} from '@angular/common/http';
import { ReactSelectorWrapperComponent } from './react-custom/react-selector-wrapper.component';
import { ReactComponentDirective } from './directives/react-component.directive';
import {ReactCounterWrapperComponent} from './react-custom/react-counter-wrapper.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ReactSelectorWrapperComponent,
        ReactComponentDirective,
        ReactCounterWrapperComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        DxDataGridModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
