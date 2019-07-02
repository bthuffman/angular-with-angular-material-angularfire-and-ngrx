// Importing all Angular Material components want to use into this file. 
import { NgModule } from '@angular/core';
import { MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule, 
    MatListModule, 
    MatTabsModule,
    MatCardModule,
    MatSelectModule, 
    MatProgressSpinnerModule, 
    MatDialogModule, 
    MatTableModule
} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule,MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule], 
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule,MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule]
})

export class MaterialModule {} 