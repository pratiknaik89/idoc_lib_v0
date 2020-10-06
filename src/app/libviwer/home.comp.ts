
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
            this.viewer.setData(this.pdfSrc, {"1":{"1601043691224":{"extras":{"recipient":{"val":"All","extra":["All"]}},"style":{"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal","width":100,"left":262,"top":796},"dataset":{"name":"1601043691224","type":"text","page":1,"fieldtype":"none","maxlength":1000,"require":true,"readonly":true,"text":"TESt"},"type":"text","id":"1601043691224","text":"TESt","val":"TESt","isviewonly":false},"1601043959494":{"extras":{"recipient":{"val":"All","extra":["All"]}},"style":{"left":169,"top":687,"width":403,"height":62,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal"},"dataset":{"name":"1601043959494","type":"note","page":1,"require":true,"maxlength":4000,"text":"DSAF f dASFdf","readonly":true},"type":"note","id":"1601043959494","text":"DSAF f dASFdf","val":"DSAF f dASFdf","isviewonly":false},"1601044929283":{"extras":{"recipient":{"val":"All","extra":["All"]},"ddlprop":{"val":"a;b;c;d","extra":["a","b","c","d"],"defval":"b"}},"style":{"left":256,"top":244,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal","width":100},"dataset":{"name":"1601044929283","type":"ddl","page":1,"require":true,"readonly":false},"type":"ddl","id":"1601044929283","text":"Dropdown","val":"c","isviewonly":false},"1601045018889":{"extras":{"recipient":{"val":"Me","extra":["Me"]}},"style":{"left":212,"top":363,"width":50,"height":50},"dataset":{"name":"1601045018889","type":"sign","page":1,"require":true,"readonly":false},"type":"sign","id":"1601045018889","isviewonly":false,"val":""},"1601045176875":{"type":"ddl","id":"1601045176875","text":"Dropdown","val":"fff","extras":{"recipient":{"val":"Doctor","extra":["Doctor"],"color":"hsl( 90, 100%, 50%, 0.4)"},"ddlprop":{"val":"fff","extra":["fff"],"defval":"fff"}},"style":{"left":536,"top":370,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal","width":240,"height":14},"dataset":{"name":"1601045176875","type":"ddl","page":1,"require":true,"readonly":false},"isviewonly":false},"1601045179762":{"type":"ddl","id":"1601045179762","text":"Dropdown","val":"dk","extras":{"recipient":{"val":"All","extra":["All"]},"ddlprop":{"val":"dld;dk","extra":["dld","dk"],"defval":"dk"}},"style":{"left":212,"top":193,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal","width":100},"dataset":{"name":"1601045179762","type":"ddl","page":1,"require":true,"readonly":false},"isviewonly":false},"1601045180519":{"type":"ddl","id":"1601045180519","text":"Dropdown","val":"gg","extras":{"recipient":{"val":"All","extra":["All"]},"ddlprop":{"val":"ffg;gg","extra":["ffg","gg"],"defval":"gg"}},"style":{"left":500,"top":134,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal","width":100},"dataset":{"name":"1601045180519","type":"ddl","page":1,"require":true,"readonly":false},"isviewonly":false},"1601045180918":{"type":"ddl","id":"1601045180918","text":"Dropdown","val":"h","extras":{"recipient":{"val":"All","extra":["All"]},"ddlprop":{"val":"t;h;gf","extra":["t","h","gf"],"defval":"h"}},"style":{"left":411,"top":173,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal","width":100},"dataset":{"name":"1601045180918","type":"ddl","page":1,"require":true,"readonly":false},"isviewonly":false},"1601045296000":{"extras":{"recipient":{"val":"All","extra":["All"]}},"style":{"fontFamily":"Helvetica","fontSize":20,"fontStyle":"normal","fontWeight":"normal","width":600,"left":170,"top":440,"height":23},"dataset":{"name":"1601045296000","type":"text","page":1,"fieldtype":"none","maxlength":1000,"require":true,"text":"TextBox","readonly":false},"type":"text","id":"1601045296000","text":"TextBox","val":"Pratik Naik","isviewonly":false},"1601905826274":{"extras":{"recipient":{"val":"Me","extra":["Me"]}},"style":{"left":483,"top":228,"width":80,"height":80},"dataset":{"name":"1601905826274","type":"radio","page":1,"group":"1601905826274","groupids":["1601905826274","1601905826288","1601905835044"],"require":true,"value":"3kokoko","checked":true,"readonly":false,"val":"3kokoko"},"type":"radio","id":"1601905826274","isviewonly":false,"val":"3kokoko"},"1601905826288":{"extras":{"recipient":{"val":"Me","extra":["Me"]}},"style":{"left":544,"top":227,"width":80,"height":80},"dataset":{"name":"1601905826274","type":"radio","page":1,"group":"1601905826274","require":true,"value":"abc13","checked":false,"readonly":false},"type":"radio","id":"1601905826288","isviewonly":false,"val":"3kokoko"},"1601905835044":{"extras":{"recipient":{"val":"Me","extra":["Me"]}},"style":{"left":594,"top":227,"width":80,"height":80},"dataset":{"name":"1601905826274","type":"radio","page":1,"group":"1601905826274","require":true,"value":"ssss","checked":false,"readonly":false},"type":"radio","id":"1601905835044","isviewonly":false,"val":"3kokoko"},"1601905851700":{"extras":{"recipient":{"val":"Me","extra":["Me"]}},"style":{"left":578,"top":281,"width":80,"height":80},"dataset":{"name":"1601905851700","type":"checkbox","page":1,"group":"1601905851700","groupids":["1601905851700","1601905852750"],"value":"C","require":false,"checked":true,"readonly":false},"type":"checkbox","id":"1601905851700","val":true,"isviewonly":false},"1601905852750":{"extras":{"recipient":{"val":"Me","extra":["Me"]}},"style":{"left":674,"top":281,"width":80,"height":80},"dataset":{"name":"1601905851700","type":"checkbox","page":1,"group":"1601905851700","groupids":["1601905851700","1601905852750"],"value":"B","require":false,"readonly":false,"checked":false},"type":"checkbox","id":"1601905852750","isviewonly":false,"val":false},"1601978169915":{"type":"sign","id":"1601978169915","isviewonly":false,"val":"","extras":{"recipient":{"val":"Me","extra":["Me"]}},"style":{"left":163,"top":293,"width":50,"height":50},"dataset":{"name":"1601978169915","type":"sign","page":1,"require":true,"readonly":false}},"1601978178215":{"type":"sign","id":"1601978178215","isviewonly":false,"val":"","extras":{"recipient":{"val":"Me","extra":["Me"]}},"style":{"left":380,"top":848,"width":50,"height":50},"dataset":{"name":"1601978178215","type":"sign","page":1,"require":true,"readonly":false}}}}, 'Me', {

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
