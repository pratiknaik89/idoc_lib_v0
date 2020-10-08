
import { Component, OnInit, ViewChild } from '@angular/core';




@Component({
    selector: 'app-home',
    templateUrl: './home.comp.html',
    styleUrls: ['./home.comp.scss']
})
export class LibViwerComponent implements OnInit {

    @ViewChild('viewer', { static: false }) viewer
    options = {
        fonts: []
    }
    activedoc = '1';
    doclist = [{
        name: 'Document Subject D Subject Herer ajjl',
        id: 1,
        status_icon: 'fa-warning',
        status_color: 'rgb(224, 120, 0)',
        extra: {}
    }, {
        name: 'DCS Subject D Subject Herer ajjl',
        status_icon: 'fa-check',
        status_color: 'rgb(0, 184, 92)',
        id: 2,
        extra: {}
    }]
    constructor() { }
    pdfSrc = "assets/Medical%20Marijuana%20and%20Telemedicine%20Consent%20(Form).pdf";
    ngOnInit(): void {


    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        setTimeout(() => {
            this.viewer.setData(this.pdfSrc, { "1": { "1601219907151": { "id": "1601219907151", "val": "Pratik Naik", "text": "TextBox", "type": "text", "style": { "top": 220, "left": 251, "width": 100, "height": 20, "fontSize": 12, "fontStyle": "normal", "fontFamily": "Arial", "fontWeight": "normal" }, "extras": { "recipient": { "val": "Doctor", "extra": ["Doctor"] } }, "dataset": { "name": "first_name", "page": 1, "text": "TextBox", "type": "text", "require": true, "readonly": true, "fieldtype": "none", "maxlength": 1000 } }, "1601220323308": { "id": "1601220323308", "type": "checkbox", "style": { "top": 356, "left": 62, "width": 80, "height": 80 }, "extras": { "recipient": { "val": "Doctor", "extra": ["Doctor"] } }, "dataset": { "name": "1601220323308", "page": 1, "type": "checkbox", "group": "1601220323308", "value": "", "require": false, "groupids": ["1601220323308", "1601220325426"] } }, "1601220325426": { "id": "1601220325426", "type": "checkbox", "style": { "top": 462, "left": 60, "width": 80, "height": 80 }, "extras": { "recipient": { "val": "Doctor", "extra": ["Doctor"] } }, "dataset": { "name": "1601220323308", "page": 1, "type": "checkbox", "group": "1601220323308", "value": "", "require": false, "groupids": ["1601220323308", "1601220325426"] } }, "1601482690613": { "id": "1601482690613", "text": "TextBox", "type": "text", "style": { "top": 218, "left": 556, "width": 100, "fontSize": 12, "fontStyle": "normal", "fontFamily": "Arial", "fontWeight": "normal" }, "extras": { "recipient": { "val": "Patient", "extra": ["Patient"] } }, "dataset": { "name": "1601482690613", "page": 1, "type": "text", "require": true, "fieldtype": "none", "maxlength": 1000 } } }, "7": { "1601219949180": { "id": "1601219949180", "type": "sign", "style": { "top": 728, "left": 144, "width": 54, "height": 54 }, "extras": { "recipient": { "val": "Doctor", "extra": ["Doctor"] } }, "dataset": { "name": "1601219949180", "page": 7, "type": "sign", "require": true } }, "1601219951443": { "id": "1601219951443", "type": "initial", "style": { "top": 809, "left": 146, "width": 53, "height": 53 }, "extras": { "recipient": { "val": "Doctor", "extra": ["Doctor"] } }, "dataset": { "name": "Initial", "page": 7, "type": "initial", "require": true } }, "1601482609127": { "id": "1601482609127", "type": "sign", "style": { "top": 720, "left": 392, "width": 57, "height": 57 }, "extras": { "recipient": { "val": "Patient", "extra": ["Patient"] } }, "dataset": { "name": "1601482609127", "page": 7, "type": "sign", "require": true } }, "1601482670138": { "id": "1601482670138", "type": "initial", "style": { "top": 806, "left": 403, "width": 60, "height": 60 }, "extras": { "recipient": { "val": "Patient", "extra": ["Patient"] } }, "dataset": { "name": "1601482670138", "page": 7, "type": "initial", "require": true } } } }, 'Patient', {},
                { "1601219907151": { "val": "Pratik Naik", "name": "first_name", "type": "text" }, "1601219949180": { "val": "https://bucket-cmp2.s3.us-east-2.amazonaws.com/signature/signature_1601990797.png", "name": "1601219949180", "type": "sign" }, "1601219951443": { "val": "https://bucket-cmp2.s3.us-east-2.amazonaws.com/signature/signature_1601990805.png", "name": "Initial", "type": "initial" }, "1601220323308": { "val": true, "name": "1601220323308", "type": "checkbox" }, "1601220325426": { "name": "1601220323308", "type": "checkbox" } })

            this.viewer.addSignatureFonts([{
                name: '\'Great Vibes\'',
                url: 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'
            }, {
                name: '\'Alex Brush\'',
                url: 'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=Rock+Salt&display=swap'
            }, {
                name: '\'Herr Von Muellerhoff\'',
                url: 'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=Herr+Von+Muellerhoff&family=Rock+Salt&display=swap'
            }])
            //this.viewer.setVisibility('all', true , true)    

        }, 100);

    }
    onFinished(e) {
        alert(this.viewer.validate('All'))
        console.log(this.viewer.validate('All'))
        console.log(this.viewer.getValues('Me'))

    }

    onCancel(e) {

    }
    onDocListSelect(item) {

        this.activedoc = item.id;
    }
    onSignatureCreate(event) {
        console.log(event);
        this.viewer.signUploaded(true,
            { name: event.name, url: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Chris_Hemsworth_Signature.png" },
            event.props);
        // this.viewer.signUploaded(true, { name: d.name, url: d.base64 }, d.controlid)

    }
}
