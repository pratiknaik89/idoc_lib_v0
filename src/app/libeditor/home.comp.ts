
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
    pdfSrc = "assets/Medical%20Marijuana%20and%20Telemedicine%20Consent%20(Form).pdf";
    ngOnInit(): void {
        setTimeout(() => {
            this.editor.setData(this.pdfSrc, { "1": { "1600154173270": { "id": "1600154173270", "type": "sign", "style": { "top": 166, "left": 40, "width": 50, "height": 50 }, "extras": { "recipient": { "val": "Doctor", "color": "hsl( 0, 100%, 50%, 0.4)", "extra": ["Doctor"] } }, "dataset": { "name": "1600154173270", "page": 1, "type": "sign", "require": true } }, "1600154186691": { "id": "1600154186691", "text": "TextBox", "type": "text", "style": { "top": 176, "left": 381, "width": 100, "fontSize": 12, "fontStyle": "normal", "fontFamily": "Arial", "fontWeight": "normal" }, "extras": { "recipient": { "val": "Patient", "color": "hsl( 180, 100%, 50%, 0.4)", "extra": ["Patient"] } }, "dataset": { "name": "1600154186691", "page": 1, "type": "text", "require": true, "fieldtype": "none", "maxlength": 1000 } } }, "2": [] });
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
