import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserModule } from "@angular/platform-browser";
import { Tooltip } from './components/tooltip/tooltip.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ModalComponent,
    Tooltip
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    ButtonComponent,
    Tooltip,
  ],
  providers: []
})
export class SharedModule { }
