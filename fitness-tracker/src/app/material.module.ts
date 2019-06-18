// Importing all Angular Material components want to use into this file. 
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [MatButtonModule],
    exports: [MatButtonModule]
})

export class MaterialModule {} 