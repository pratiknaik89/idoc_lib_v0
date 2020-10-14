
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
            this.viewer.setData(this.pdfSrc, {"1":{"1601219907151":{"id":"1601219907151","val":"Pratik Naik","text":"TextBox","type":"text","style":{"top":220,"left":251,"width":100,"height":20,"fontSize":12,"fontStyle":"normal","fontFamily":"Arial","fontWeight":"normal"},"extras":{"recipient":{"val":"Doctor","extra":["Doctor"]}},"dataset":{"name":"first_name","page":1,"text":"TextBox","type":"text","require":true,"readonly":false,"fieldtype":"none","maxlength":10,"placeholder":"Textbox"},"isviewonly":true},"1601220323308":{"id":"1601220323308","type":"checkbox","style":{"top":356,"left":62,"width":80,"height":80},"extras":{"recipient":{"val":"Doctor","extra":["Doctor"]}},"dataset":{"name":"1601220323308","page":1,"type":"checkbox","group":"1601220323308","value":"","require":false,"groupids":["1601220323308","1601220325426"],"checked":true,"readonly":false},"isviewonly":true,"val":true},"1601220325426":{"id":"1601220325426","type":"checkbox","style":{"top":462,"left":60,"width":80,"height":80},"extras":{"recipient":{"val":"Doctor","extra":["Doctor"]}},"dataset":{"name":"1601220323308","page":1,"type":"checkbox","group":"1601220323308","value":"","require":false,"groupids":["1601220323308","1601220325426"],"readonly":false},"isviewonly":true},"1601482690613":{"id":"1601482690613","text":"TextBox","type":"text","style":{"top":218,"left":556,"width":100,"fontSize":12,"fontStyle":"normal","fontFamily":"Arial","fontWeight":"normal"},"extras":{"recipient":{"val":"Doctor","extra":["Doctor"],"color":"hsl( 90, 100%, 50%, 0.4)"}},"dataset":{"name":"1601482690613","page":1,"type":"text","require":true,"fieldtype":"none","maxlength":10,"readonly":false,"placeholder":"Textbox"},"isviewonly":false,"val":""}},"7":{"1601219949180":{"id":"1601219949180","type":"sign","style":{"top":728,"left":144,"width":54,"height":54},"extras":{"recipient":{"val":"Doctor","extra":["Doctor"]}},"dataset":{"name":"1601219949180","page":7,"type":"sign","require":true,"readonly":false},"isviewonly":true,"val":"https://bucket-cmp2.s3.us-east-2.amazonaws.com/signature/signature_1601990797.png"},"1601219951443":{"id":"1601219951443","type":"initial","style":{"top":809,"left":146,"width":53,"height":53},"extras":{"recipient":{"val":"Doctor","extra":["Doctor"]}},"dataset":{"name":"Initial","page":7,"type":"initial","require":true,"readonly":false},"isviewonly":true,"val":"https://bucket-cmp2.s3.us-east-2.amazonaws.com/signature/signature_1601990805.png"},"1601482609127":{"id":"1601482609127","type":"sign","style":{"top":720,"left":392,"width":57,"height":57},"extras":{"recipient":{"val":"t","extra":["t"],"color":"hsl( 180, 100%, 50%, 0.4)"}},"dataset":{"name":"1601482609127","page":7,"type":"sign","require":true,"readonly":false},"isviewonly":false},"1601482670138":{"id":"1601482670138","type":"initial","style":{"top":806,"left":403,"width":60,"height":60},"extras":{"recipient":{"val":"t","extra":["t"],"color":"hsl( 180, 100%, 50%, 0.4)"}},"dataset":{"name":"1601482670138","page":7,"type":"initial","require":true,"readonly":false},"isviewonly":false},"1602676671226":{"extras":{"recipient":{"val":"Doctor","extra":["Doctor"],"color":"hsl( 90, 100%, 50%, 0.4)"}},"style":{"left":562,"top":724,"width":80,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal"},"dataset":{"name":"1602676671226","type":"signdate","page":7},"type":"signdate","id":"1602676671226","text":"Sign Date"},"1602676682818":{"extras":{"recipient":{"val":"All","extra":["All"]}},"style":{"left":560,"top":813,"width":80,"fontFamily":"Arial","fontSize":12,"fontStyle":"normal","fontWeight":"normal"},"dataset":{"name":"1602676682818","type":"signdate","page":7},"type":"signdate","id":"1602676682818","text":"Sign Date", "val":"2020-01-09"}}})

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
