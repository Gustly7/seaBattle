import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {field} from './field';
import {cell} from './cell';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [field, cell],
    bootstrap: [field]
})
export class AppModule {
}