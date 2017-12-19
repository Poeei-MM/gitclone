import { LogoutPage } from './logout';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        LogoutPage,
    ],
    imports: [
        IonicPageModule.forChild(LogoutPage),
    ],
    exports: [
        LogoutPage
    ]
})

export class LogoutPageModule { };
