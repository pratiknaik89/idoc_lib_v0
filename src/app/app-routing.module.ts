import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FileFolderComponent } from './fileupload_rnd/home.comp';
import { LibEditorComponent } from './libeditor/home.comp';
import { LibViwerComponent } from './libviwer/home.comp';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{
        path: 'libeditor',
        component: LibEditorComponent
    }, {
        path: 'libviwer',
        component: LibViwerComponent

    },{
      path: 'folder_demo',
      component: FileFolderComponent

  }]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
