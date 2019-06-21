// Importing all Angular Material components want to use into this file. 
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon'

@NgModule({
    imports: [MatButtonModule, MatIconModule],
    exports: [MatButtonModule, MatIconModule]
})

export class MaterialModule {} 