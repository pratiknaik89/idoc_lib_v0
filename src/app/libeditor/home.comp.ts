
import { Component, OnInit, ViewChild } from '@angular/core';
import { iDocsigneditorComponent } from 'dist/esigndoccontrol/lib/editor/idocsigneditor.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.comp.html',
    styleUrls: ['./home.comp.scss']
})
export class LibEditorComponent implements OnInit {
    @ViewChild('editor', { static: false }) editor: iDocsigneditorComponent
    options = {
        fonts: []
    }
    recipients = [
        "All",
        "Doctor",
        "Patients"]
    constructor() { }
    pdfSrc = "https://bucket-cmp2.s3.us-east-2.amazonaws.com/template/Valparaiso_PermitApp_1600752463.pdf";
    ngOnInit(): void {
        setTimeout(() => {
            this.editor.setData(this.pdfSrc,JSON.parse(localStorage.getItem('docdata')));
            this.editor.setRecipients(this.recipients);
        }, 5000);
    }

    onObjectSelected(e) {
        //console.log(e);
    }

    onObjectDeselected(e) {
        //console.log('delected',e);
    }

    getDate() {
        console.log(this.editor.getData());
    }
}
