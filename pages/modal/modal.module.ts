import { ModalPage } from './modal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        ModalPage,
    ],
    imports: [
        IonicPageModule.forChild(ModalPage),
    ],
    exports: [
        ModalPage
    ]
})

export class ModalPageModule { };
