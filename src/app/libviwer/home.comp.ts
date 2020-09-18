
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
            this.viewer.setData(this.pdfSrc, {
                "1":
                    { "1600154443849": { "id": "1600154443849", "text": "TextBox", "type": "text", "style": { "top": 155, "left": 194, "width": 100, "fontSize": 12, "fontStyle": "normal", "fontFamily": "Arial", "fontWeight": "normal" }, "extras": { "recipient": { "val": "Doctor", "color": "hsl( 0, 100%, 50%, 0.4)", "extra": ["Doctor"] } }, "dataset": { "name": "1600154443849", "page": 1, "type": "text", "require": true, "fieldtype": "none", "maxlength": 1000 } }, "1600154449648": { "id": "1600154449648", "type": "sign", "style": { "top": 342, "left": 161, "width": 50, "height": 50 }, "extras": { "recipient": { "val": "Patient", "color": "hsl( 180, 100%, 50%, 0.4)", "extra": ["Patient"] } }, "dataset": { "name": "1600154449648", "page": 1, "type": "sign", "require": true } } }, "2": { "1600154457678": { "id": "1600154457678", "text": "TextBox", "type": "text", "style": { "top": 172, "left": 358, "width": 100, "fontSize": 12, "fontStyle": "normal", "fontFamily": "Arial", "fontWeight": "normal" }, "extras": { "recipient": { "val": "Doctor", "color": "hsl( 0, 100%, 50%, 0.4)", "extra": ["Doctor"] } }, "dataset": { "name": "1600154457678", "page": 2, "type": "text", "require": true, "fieldtype": "none", "maxlength": 1000 } }, "1600154460934": { "id": "1600154460934", "type": "sign", "style": { "top": 521, "left": 379, "width": 50, "height": 50 }, "extras": { "recipient": { "val": "Patient", "color": "hsl( 180, 100%, 50%, 0.4)", "extra": ["Patient"] } }, "dataset": { "name": "1600154460934", "page": 2, "type": "sign", "require": true } } }
            },
                'Patient', {
                "1600154449648": {
                    "value": "https://bucket-cmp2.s3.us-east-2.amazonaws.com/signature/7c7bd170-f746-11ea-b655-029cd58f3b70/signature_1600169264.png"
                }
            })




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

        console.log(this.viewer.validate('Patient')) 
        console.log(this.viewer.getValues('Patient'))

    }

    onCancel(e) {

    }
    onDocListSelect(item) {
        
        this.activedoc = item.id;
    }
    onSignatureCreate(d) {
        console.log(d);
        this.viewer.signUploaded(true, { name: d.name, url: d.base64 }, d.controlid)

    }
}
