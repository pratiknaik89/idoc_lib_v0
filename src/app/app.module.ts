import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { iEditorModule } from 'dist/esigndoccontrol'
import { iViewerModule } from  'dist/esigndoccontrol'



import { LibEditorComponent } from './libeditor/home.comp';
import { LibViwerComponent } from './libviwer/home.comp';
import { FileFolderComponent } from './fileupload_rnd/home.comp';


@NgModule({
  declarations: [
    AppComponent,
    LibEditorComponent,
    LibViwerComponent,
    FileFolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    iEditorModule,
    iViewerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
