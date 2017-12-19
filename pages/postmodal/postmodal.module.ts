import { PostModalPage } from './postmodal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        PostModalPage,
    ],
    imports: [
        IonicPageModule.forChild(PostModalPage),
    ],
    exports: [
        PostModalPage,
    ]
})

export class PostModalPageModule { };
