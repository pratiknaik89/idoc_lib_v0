
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
        this.viewer.setData(this.pdfSrc, {"1":{"1600154173270":{"id":"1600154173270","type":"sign","style":{"top":166,"left":40,"width":50,"height":50},"extras":{"recipient":{"val":"Doctor","color":"hsl( 0, 100%, 50%, 0.4)","extra":["Doctor"]}},"dataset":{"name":"1600154173270","page":1,"type":"sign","require":true}},"1600417040864":{"extras":{"recipient":{"val":"All","extra":["All"]},"ddlprop":{"val":"a;b;c","extra":["a","b","c"],"defval":"a"}},"style":{"left":381,"top":210,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal","width":100},"dataset":{"name":"1600417040864","type":"ddl","page":1,"require":true},"type":"ddl","id":"1600417040864","text":"Dropdown","val":"a"},"1600417058994":{"extras":{"recipient":{"val":"All","extra":["All"]},"ddlprop":{"val":"p;q;r","extra":["p","q","r"],"defval":""}},"style":{"left":616,"top":226,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal","width":100},"dataset":{"name":"1600417058994","type":"ddl","page":1,"require":true},"type":"ddl","id":"1600417058994","text":"Dropdown","val":""},"1600418396341":{"extras":{"recipient":{"val":"All","extra":["All"]}},"style":{"left":243,"top":323,"width":80,"height":80},"dataset":{"name":"1600418396341","type":"radio","page":1,"group":"1600418396341","groupids":["1600418396341","1600418396361","1600418397616"],"require":true,"value":""},"type":"radio","id":"1600418396341"},"1600418396361":{"extras":{"recipient":{"val":"All","extra":["All"]}},"style":{"left":243,"top":343,"width":80,"height":80},"dataset":{"name":"1600418396341","type":"radio","page":1,"group":"1600418396341","require":true,"value":""},"type":"radio","id":"1600418396361"},"1600418397616":{"extras":{"recipient":{"val":"All","extra":["All"]}},"style":{"left":243,"top":363,"width":80,"height":80},"dataset":{"name":"1600418396341","type":"radio","page":1,"group":"1600418396341","require":true,"value":""},"type":"radio","id":"1600418397616"}},"2":[]},'All')




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

        console.log(this.viewer.validate('All')) 
        console.log(this.viewer.getValues('All'))

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
