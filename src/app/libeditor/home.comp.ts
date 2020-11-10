
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
        "Patient",
        "Doctor"]
    constructor() { }
    pdfSrc = "https://dcbdb209393048bdaf49c63c3b27f5f1-cmp2.s3.amazonaws.com/template/Authorization_for_Release_of_Individually_Identified_Health_1604578911.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ4SDSBL7TIYUKZXO%2F20201110%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201110T111812Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=4af97a2b7e4c1f589dd734b21b4bf927487cffcf453881762e8843b88fa225aa";
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
        
        console.log(this.editor.getAllPropsBinding());
        console.log(this.editor.validate())
        console.log(this.editor.getData());
    }
}
