import {
  Component, OnInit, ViewChild, TemplateRef, EventEmitter,
  ChangeDetectorRef, Input, NgModule, Output
} from '@angular/core';
import { PDFDocumentProxy, PDFProgressData } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { GroupByPipe } from './pipe/group-by';
import { Textbox } from './controls/textbox.control';
import { Dropdown } from './controls/ddl.control';
import { Sign } from './controls/sign.control';
import { Initial } from './controls/initial.control';
import { InitialDate } from './controls/initialdate.control';
import { Note } from './controls/note.control';
import { Pic } from './controls/pic.control';
import { Attachment } from './controls/attachment.control';
import { Location } from './controls/loc.control';
import { Barcode } from './controls/br.control';
import { QRCode } from './controls/qr.control';
import { CheckBox } from './controls/checkbox.control';
import { Radio } from './controls/radio.control';
import { CustomDdlComponent } from './controls/customdropdown';
import { Constants } from './helper/constants';
//import { version } from 'package.json'
declare var $: any;
declare var jq_scale_zoom: any;
@Component({
  selector: 'i-docsigneditor',
  templateUrl: './idocsigneditor.component.html',
  styleUrls: ['./idocsigneditor.component.scss']
})
export class iDocsigneditorComponent implements OnInit {
  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // pdfSrc = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";
  //url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
  allowDomain = ["bG9jYWxob3N0", "aWRlYXMydGVjaA=="]
  @ViewChild('ddl', { static: false }) ddl: TemplateRef<any>;
  @ViewChild('number', { static: false }) number: TemplateRef<any>;
  @ViewChild('checkbox', { static: false }) checkbox: TemplateRef<any>;
  @ViewChild('text', { static: false }) text: TemplateRef<any>;
  @ViewChild('ddlprop', { static: false }) ddlprop: TemplateRef<any>;
  @ViewChild('recipient', { static: false }) recipient: TemplateRef<any>;

  // @Input('url') 
  url = '';

  //toolbar and heading
  @Input() toolbarBg = '#e9e9e9';
  @Input() toolbarColor = '#333333';

  //offline data savinf
  @Input() offlineSaving: boolean = true;
  @Input() offlineType: 'localstorage' | 'event' = 'localstorage';
  @Input() offlineInterval = 5;
  @Input() zoom = 0.80;

  //reduce height from 100vh
  @Input() reduceHeight = 0;
  @Input('options') options = {
    fonts: ['Arial', 'Helvetica', 'Calibri']
  }

  recipients: any = [];

  // events 
  @Output() onOfflineStore: EventEmitter<any> = new EventEmitter();
  @Output() onZoom: EventEmitter<boolean> = new EventEmitter();
  @Output() onObjectSelected: EventEmitter<any> = new EventEmitter();
  @Output() onObjectDeselected: EventEmitter<any> = new EventEmitter();
  @Output() onObjectAdded: EventEmitter<any> = new EventEmitter();
  @Output() onObjectRemoved: EventEmitter<any> = new EventEmitter();
  @Output() onLoadCompleted: EventEmitter<any> = new EventEmitter();

  controlSet = {};
  selectedRecipient = {
    name: '',
    color: '#ffd65b'
  };
  progress = 10;

  setRecipients(rec_array) {
    this.recipients = [];
    for (let i = 0; i < rec_array.length; i++) {
      var color = "hsl( " + this.makeColor(i, rec_array.length) + ", 100%, 50%, 0.4)";
      const key = rec_array[i];
      this.recipients.push({
        name: key,
        color: color
      })
    }
    if (this.recipients.length > 0) {
      this.selectedRecipient = this.recipients[0];
    }
  }

  getRecipients() {
    return this.recipients;
  }

  getData() {
    let pages = Object.keys(this.externalProp);
    for (let i = 0; i < pages.length; i++) {
      let d = this.externalProp[pages[i]];
      if (!(d && Object.keys(d).length > 0)) {
        delete this.externalProp[pages[i]]
      }
    }
    return this.externalProp || {};
  }

  setData(pdfUrl, data) {
    this.progress = 30
    //this.removeAllControls();
    this.externalProp = data || {};
    this.url = pdfUrl;
  }


  isPro = false;
  thumbnails = [];

  selectedObject: any = null;
  selectedField: any = {};

  page = 1;
  optionShowHide = {
    copy: true
  }
  private scale = 1;
  private localStorageKey = 'docdata';


  controls = [
    { id: 'text', 'group': 'Input', type: 'text', text: 'TextBox', 'icon': 'fa-font', propsallow: ['recipient', 'require', 'readonly', 'name', 'text', 'tooltip', 'fieldtype', 'maxlength', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'left', 'top', 'width'] },
    { id: 'ddl', 'group': 'Input', type: 'ddl', text: 'Dropdown', 'icon': 'fa-toggle-down', propsallow: ['recipient', 'require', 'name', 'tooltip', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'left', 'top', 'width', 'ddlprop'] },
    { id: 'sign', 'group': 'Sign', type: 'sign', text: 'Signature', 'icon': 'fa-pencil', propsallow: ['recipient', 'require', 'name', 'tooltip', 'left', 'top'] },
    { id: 'initial', 'group': 'Sign', type: 'initial', text: 'Initital', 'icon': 'fa-pencil', propsallow: ['recipient', 'require', 'name', 'tooltip', 'left', 'top'] },
    { id: 'signdate', 'group': 'Sign', type: 'signdate', text: 'Signed Date', 'icon': 'fa-calendar', propsallow: ['recipient', 'name', 'tooltip', '', 'dateFormat', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'left', 'top'] },
    { id: 'checkbox', 'group': 'Input', type: 'checkbox', text: 'Checkbox', 'icon': 'fa-check-square-o', propsallow: ['recipient', 'readonly', 'name', 'tooltip', 'value', 'checked', 'left', 'top'] },
    { id: 'radio', 'group': 'Input', type: 'radio', text: 'Radio', 'icon': 'fa-dot-circle-o', propsallow: ['recipient', 'require', 'name', 'tooltip', 'value', 'checked', 'left', 'top'] },
    { id: 'note', 'group': 'Input', type: 'note', text: 'Note', 'icon': 'fa-sticky-note-o', propsallow: ['recipient', 'require', 'readonly', 'name', 'text', 'tooltip', 'maxlength', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'left', 'top', 'width', 'height'] },
    { id: 'attach', 'group': 'Advanced', type: 'attach', text: 'Attachment', 'icon': 'fa-paperclip', propsallow: ['recipient', 'require', 'name', 'tooltip', 'left', 'top'], isPro: true },
    { id: 'pic', 'group': 'Advanced', type: 'pic', text: 'Picture', 'icon': 'fa-camera-retro', propsallow: ['recipient', 'require', 'name', 'tooltip', 'left', 'top', 'width', 'height'], isPro: true },
    { id: 'loc', 'group': 'Advanced', type: 'loc', text: 'Location', 'icon': 'fa-map-marker', propsallow: ['recipient', 'require', 'name', 'tooltip', 'left', 'top', 'width', 'height'], isPro: true }
  ];

  controlsfilter = [];
  propBehaviour = Constants.propFields;
  version = '';
  constructor(private zone: ChangeDetectorRef) {
    this.controlsfilter = this.controls.filter(a => { return this.isPro ? true : !a.isPro });
    this.propBehaviour.fontFamily.values = this.options.fonts;
    this.version = 'v0.0.26';
    // this message from master
    // this is camera branch
  }

  autosaving = false;
  private autoSavingTimer;
  private isNewData = false;
  startAutoSave() {
    if (this.autoSavingTimer) {
      clearInterval(this.autoSavingTimer);
    }
    this.autoSavingTimer = setInterval(() => {
      if (this.offlineSaving && this.isNewData) {
        this.autosaving = true;
        this.isNewData = false;
        this.offlineSave();
        setTimeout(() => {
          this.autosaving = false;
        }, 3000);
      }
    }, this.offlineInterval * 1000);
  }



  ngOnInit(): void {
    for (let i = 0; i < this.allowDomain.length; i++) {
      const element = this.allowDomain[i];

      if (window.location.hostname.indexOf(window.atob(element)) > -1) {


        break;
      }

    }

    let d = localStorage.getItem(this.localStorageKey);
    if (d) {
      this.externalProp = JSON.parse(d) || {};
    }
    // $(document).keydown(function (event) {
    //     if (event.which == 8) {
    //         if (this.selectedObject.canvas.getActiveObject()) {
    //             this.selectedObject.canvas.getActiveObject().remove();
    //         }
    //     }
    // });


  }

  onPageClick(page) {
    this.page = page;
  }

  public zoomIn(): void {
    if (this.zoom >= 2.0) return;
    //this.scale = 1;
    this.zoom += .10;
    this.onZoom.emit(true);

  }

  public zoomOut(): void {
    if (this.zoom <= 0.60) return;
    //this.scale = -1;
    this.zoom -= .10;
    this.onZoom.emit(false);
  }

  onReccipientChange(item) {

    this.selectedRecipient = item;
    console.log(item)
  }

  validate(): boolean {
    let isbreak = false;
    let error = '';
    let ctrlProp: any = {};
    this.loopEachControl(isbreak, (ctrl, allctr) => {
      this.removeError(ctrl.id);
      if (ctrl.type == "ddl") {
        if (!(ctrl.extras.ddlprop && ctrl.extras.ddlprop.val && ctrl.extras.ddlprop.val.trim() !== "")) {
          error = 'Please add atleast one item.'
          ctrlProp = ctrl;
          isbreak = true;
        }
      } else if (ctrl.type == "radio") {
        for (let i = 0; i < ctrl.dataset.groupids.length; i++) {
          const id = ctrl.dataset.groupids[i];
          var ictrl = this.externalProp[ctrl.dataset.page][id];
          if (ictrl.dataset.value.trim() == '') {
            error = 'Please set value property.'
            ctrlProp = ctrl;
            isbreak = true;
            break
          }
        }
      }
    })
    if (ctrlProp && ctrlProp.id) {
      this.controlClickHandler($('#' + ctrlProp.id)[0]);
      this.adderror(ctrlProp, error);
      return false;
    }
    return true
  }

  adderror(prop, error) {
    $('#' + prop.id).append('<span title="' + error + '" id="error" style="position: absolute;top: -11px;left: -8px;color: red;font-size: 12px;"><i class="fa fa-warning"></i></span>');
  }
  removeError(id) {
    $('#' + id).find('#error').remove();
  }

  getAllPropsBinding() {
    let propbinds = [];
    this.loopEachControl(false, (ctrl, allpage) => {
      if (propbinds.indexOf(ctrl.dataset.name) == -1) {
        propbinds.push(ctrl.dataset.name)
        console.log('2')
      }
    })
    console.log('1')
    return propbinds;

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    $(".draggable").draggable({
      cursorAt: { top: 0, left: 0 },
      helper: function (event) {

        return $("<div class='helper'>" + $(this).html() + "</div>");
      },
      revert: "invalid",
      cursor: "move",
      start: function (event, ui) { $(this).css("z-index", 99999); $(this).css("z-index", 99999); }
    });

    $('#progressbar').progressbar({
      value: false
    })
    let that = this;
    // $(function () {

    //     $(document).bind('keydown', function (e) {
    //         if (that.selectedControl && $(that.selectedControl).is(":focus")) {
    //             e.preventDefault();
    //             if (e.keyCode == 37) // right -- 
    //             {
    //                 that.selectedField['postion']['left']['value'] -= 1;
    //                 //that.selectedControl.style['left'] = (parseFloat(that.selectedControl.style['left']) + 1) + 'px'
    //             } else if (e.keyCode == 39) //left
    //             {
    //                 that.selectedField['postion']['left']['value'] += 1;
    //                 //that.selectedControl.style['left'] = (parseFloat(that.selectedControl.style['left']) - 1) + 'px'
    //             }
    //             else if (e.keyCode == 40) // key down
    //             {
    //                 that.selectedField['postion']['top']['value'] += 1;
    //                 //that.selectedControl.style['top'] = (parseFloat(that.selectedControl.style['top']) - 1) + 'px'
    //             } else if (e.keyCode == 38) //Key up
    //             {
    //                 that.selectedField['postion']['top']['value'] -= 1;
    //                 //that.selectedControl.style['top'] = (parseFloat(that.selectedControl.style['top']) + 1) + 'px'
    //             } else if (e.keyCode == 8 || e.keyCode == 46) //Key up
    //             {
    //                 that.removeControl();
    //                 //that.selectedControl.style['top'] = (parseFloat(that.selectedControl.style['top']) + 1) + 'px'
    //             }

    //             that.updateProperties()
    //             return false;
    //         }
    //     })
    // });


  }




  scalereloadComponent(page, SCALE) {


    $('#cpage' + page).css({ 'transform-origin': '0% 0%', 'transform': 'scale(' + this.scale + ', ' + this.scale + ')' });
    // let zoomfactor =  this.zoom;
    // let controls = Object.keys(this.externalProp[page]);
    // for (let j = 0; j < controls.length; j++) {
    //     const control: any = this.externalProp[page][controls[j]];
    //     if (control && typeof (control) == 'object') {
    //         console.log($('#' + control.id));
    //         $('#' + control.id).css({ 'left': (control.style.left * zoomfactor) + 'px', "top": (control.style.top * zoomfactor) + 'px', 'transform': 'scale(' + this.zoom + ')' });
    //     }
    // }
  }

  pageRendered(e) {
    let that = this;
    debugger
    console.log(e.pageNumber)

    //$(".page[data-page-number='" + e.pageNumber + "']").append('<div class="pdfcontrols" style="width:' + e.source.div.offsetWidth + 'px; height:' + e.source.div.offsetHeight + 'px"><canvas id="cpage' + e.pageNumber + '" width=' + (e.source.div.offsetWidth + 1) + ' height="' + (e.source.div.offsetHeight + 1) + '" style="width:' + (e.source.div.offsetWidth + 1) + 'px; height:' + (e.source.div.offsetHeight + 1) + 'px""></div>')
    this.scale = e.source.scale;
    jq_scale_zoom = this.scale;
    $(".page[data-page-number='" + e.pageNumber + "']").append('<div class="pdfcontrols"  id="cpage' + e.pageNumber + '" style="width:' + (e.source.div.offsetWidth / this.scale) + 'px; height:' + (e.source.div.offsetHeight / this.scale) + 'px;transform-origin: 0% 0%; transform: scale(' + this.scale + ', ' + this.scale + ')"></div>')

    $("#cpage" + e.pageNumber).droppable({
      classes: {
        "ui-droppable-hover": "ondrpclass"
      },
      drop: function (event, ui) {
        console.log(e.pageNumber)
        if (!$(ui.draggable).hasClass('newelement')) {
          return
        }

        let type = ui.draggable[0].type
        let position = {
          left: Math.ceil((ui.offset.left - $(this).offset().left) / that.scale),
          top: Math.ceil((ui.offset.top - $(this).offset().top) / that.scale)
        }
debugger
        let id = that.addControlsHtml({}, e.pageNumber, position, type);
        if (type == 'radio') {
          position.top += 20

          that.addControlsHtml({}, e.pageNumber, position, type, id);
        }


      }
    });

    $("#cpage" + e.pageNumber).bind('click', function (e) {
      e.preventDefault();
      that.removeSelection();
      return false;
    })


    $("#cpage" + e.pageNumber).bind('click', function (e) {
      e.preventDefault();
      that.removeSelection();
      return false;
    })
    let contextposition: any = { x: 0, y: 0 }
    $("#cpage" + e.pageNumber).bind("contextmenu", function (e) {

      contextposition.x = e.offsetX;
      contextposition.y = e.offsetY;
    })
    $.contextMenu({
      selector: "#cpage" + e.pageNumber,
      items: {
        paste: {
          name: "Paste",
          icon: "fa-clipboard",
          callback: function (key, opt) {

            that.paste(contextposition.x, contextposition.y)
          }
        }
      }
    });


    // new Selectables({
    //     elements: '.defaultcomp',
    //     selectedClass: 'active',
    //     zone: '#cpage' + e.pageNumber,
    //     start: function (e) {

    //     }
    // });

    // let can = new fabric.Canvas('cpage' + e.pageNumber);
    // if (this.pagesArray[e.pageNumber]) {
    //     can.loadFromJSON(this.pagesArray[e.pageNumber], () => {
    //         this.canvaspages[e.pageNumber] = can;
    //     })
    // }
    // can.on('drop', (ee: fabric.IEvent) => {

    //     this.addControls(ee.e, can)
    //     this.canvaspages[e.pageNumber] = can;
    // });

    // can.on('selection:cleared', (ee: fabric.IEvent) => {
    //     this.selectedObject = null;
    //     this.hideProperties();
    // });
    // can.on('mouse:down', (evn: fabric.IEvent) => {


    //     if (evn.target == null) return
    //     // if(this.selectedObject){
    //     //     this.selectedObject.canvas._discardActiveObject();

    //     // }

    //     this.selectedObject = evn.target;
    //     this.showProperties(evn.target, evn.target['prop'].type)
    // })



    // can.on('object:modified', (evn: fabric.IEvent) => {


    //     if (evn.target == null) return
    //     // if(this.selectedObject){
    //     //     this.selectedObject.canvas._discardActiveObject();

    //     // }
    //     if (evn.target['prop'].type == 'text') {



    //     }


    //     this.selectedObject = evn.target;
    //     this.showProperties(evn.target, evn.target['prop'].type)
    // })





    // let ctrl = new fabric.Textbox('Hello World !', {
    //     left: 50,
    //     top: 50,
    //     fontSize: 12,
    //     width: 150,
    //     centeredRotation: false,
    //     centeredScaling: false,
    //     fontFamily: 'Helvetica',
    //     backgroundColor: 'yellow',
    //     cornerSize: 10,
    //     cornerStyle: 'circle',

    // });


    let components;
    if (this.externalProp) {
      components = this.externalProp[e.pageNumber];
    }


    if (components) {
      let ids = Object.keys(components)
      for (let index = 0; index < ids.length; index++) {
        const element = components[ids[index]];
        this.addControlsHtml(element, e.pageNumber, {}, element.type, element.dataset.group, element.style, element, true);
      }
    }


  }



  pagesArray: any = {}
  totalpagesarr = [];
  totalpages = 0;
  loadComplete(pdf: PDFDocumentProxy): void {
    debugger
    this.startAutoSave();
    this.totalpages = pdf.numPages;
    for (let i = 1; i <= pdf.numPages; i++) {
      this.thumbnails.push({
        page: i,
        count: 0
      })
      this.totalpagesarr.push(i);
      this.showThumbnailCount(i);
    }

    setTimeout(() => {

      this.progress = 100;
      setTimeout(() => {
        $('#loader').hide();
        this.onLoadCompleted.emit('complete')
      }, 1000);
    }, 400);
  }

  onProgress(progressData: PDFProgressData) {
    console.log(progressData.loaded, progressData.total)
    if (progressData.loaded > progressData.total) {
      this.progress = 30 + (((progressData.total * 70) / progressData.loaded))
    } else {
      this.progress = 30 + (((progressData.loaded * 70) / progressData.total))
    }
    // console.log(progressData.total, progressData.loaded)
    // do anything with progress data. For example progress indicator
  }


  evtAddRemoveControl(page, control) {
    this.showThumbnailCount(page);
  }

  showThumbnailCount(page) {
    if (!this.externalProp || !this.externalProp[page]) return;
    var controlsAdded = Object.keys(this.externalProp[page]).length;
    let f = this.thumbnails.find(a => {
      return a.page == page
    })
    f.count = controlsAdded;

  }

  xy = '';
  dragstart(e, item) {
    e.dataTransfer.setData('data', JSON.stringify(item))
    // console.log(e.offsetX, e.clientX, e.layerX, e.movementX, e.offsetX, e.pageX, e.screenX, e.X)
    // console.log($(e.target).offset())


  }
  allowDrop(ev) {
    // ev.preventDefault();
  }


  dradend(e, item) {

    console.log($(e.target).offset())
  }

  // dragFix(event, ui, containmentArea, scale) {
  //   var contWidth = containmentArea.width() - 12, contHeight = containmentArea.height() - 2;
  //   ui.position.left = Math.max(0, Math.min(ui.position.left / scale, contWidth - ui.helper.width()));
  //   ui.position.top = Math.max(0, Math.min(ui.position.top / scale, contHeight - ui.helper.height()));
  // }


  lastCopyElement = undefined;
  addControlsHtml(el, page, position, type, group = null, style = null, props = null, loadFromFile = false, defaultselected = true, iscopy = false) {

    let cprop = undefined;
    let cprops = undefined;
    if (props) {
      cprop = JSON.stringify(props);
      cprops = JSON.parse(cprop);
    }
    if (loadFromFile) {
      defaultselected = false;
    }

    if (iscopy) {
      delete cprops.extras;
      delete cprops.dataset;
      delete cprops.style;
    }

    let id = el.id || ((new Date()).getTime() + "");
    props = props || {}

    if (props.style && position.left) {
      props.style.left = position.left;
      props.style.top = position.top;
    } else if (props.style) {
      position.left = props.style.left;
      position.top = props.style.top;

    }

    let prop: any = {
      ...cprops,
      extras: props.extras || {},
      style: {
        left: position.left,
        top: position.top,
      },
      dataset: {
        ...el,
        name: el.name || id,
        type: type,
        page: page
      },
      type: type,
      id: id
    }



    if (loadFromFile) {
      prop = props;
    } else {
      prop.extras = {
        "recipient": {
          "val": this.selectedRecipient.name,
          "extra": [
            this.selectedRecipient.name
          ]
        }
      }
    }

    let control;
    if (type == 'text') {
      control = new Textbox(prop, style);
    }
    else if (type == 'ddl') {
      control = new Dropdown(prop, style);
    }
    else if (type == 'sign') {
      control = new Sign(prop, style);
    }
    else if (type == 'initial') {
      control = new Initial(prop, style);
    }
    else if (type == 'signdate') {
      control = new InitialDate(prop, style);
    }
    else if (type == 'note') {
      control = new Note(prop, style);
    }
    else if (type == 'checkbox') {

      prop.dataset.group = group || id;
      if (!group) {
        prop.dataset.name = id;
        prop.dataset.groupids = [id];
      } else {
        prop.dataset.name = prop.dataset.name || el.name || group;
        if (this.externalProp[page][group].dataset['groupids'].indexOf(id) == -1) {
          this.externalProp[page][group].dataset['groupids'].push(id);
        }
      }
      prop.dataset.value = prop.dataset.value || '';
      // control = this.createCheckBox(prop);
      debugger
      control = new CheckBox(prop, style);
      control.props.dataset.require = false;
    }
    else if (type == 'radio') {

      prop.dataset.group = group || id;

      if (!group) {
        prop.dataset.name = id;
        prop.dataset.groupids = [id];
      } else {
        prop.dataset.name = prop.dataset.name || el.name || group;
        if (this.externalProp[page][group].dataset['groupids'].indexOf(id) == -1) {
          this.externalProp[page][group].dataset['groupids'].push(id);
        }
      }
      prop.dataset.require = prop.dataset.require || true;
      prop.dataset.value = prop.dataset.value || id;
      prop.dataset.val = prop.dataset.checked ? prop.dataset.value : undefined;
      control = new Radio(prop, style);
    }
    else if (type == 'attach') {
      control = new Attachment(prop, style);
    }
    else if (type == 'loc') {
      control = new Location(prop, style);
    }
    else if (type == 'pic') {
      control = new Pic(prop, style);
    }
    else if (type == 'qr') {
      control = new QRCode(prop, style);
    }
    else if (type == 'br') {
      control = new Barcode(prop, style);

    }

    this.controlSet[control.props.id] = control;

    var _extprop = this.getExternalProp(page, id);
    if (!_extprop) {
      _extprop = {};
      _extprop = {
        ...prop
      };
      if (!this.externalProp[page]) {
        this.externalProp[page] = {};
      }
      this.setExternalProp(page, id, _extprop);
    }



    // adding control on page
    control.add();
    if (_extprop && _extprop.extras && _extprop.extras['recipient']) {
      let itm = { name: '', color: '' };
      itm.name = _extprop.extras['recipient'].val;
      let findRecipient = this.recipients.find(a => {
        return a.name == itm.name
      })
      if (findRecipient) {
        itm.color = findRecipient.color;
      }

      this.controlSet[control.props.id].setBgColor(itm.color);
    }

    // enable feature draggable
    control.draggable(() => { // on start drag

    }, () => { // on drag
      console.log(this.scale);
    }, (el, ui, ctr) => {// on start drag
      this.showPropertiesF(ctr, true)
    }, this.scale);

    // enable feature resizable
    control.resizable((el) => {// on start resize

    }, (el, height, width) => { // on stop resize
      this.onModify(control.props);
      //this.showPropertiesF(el)
    });


    control.selected = (selectedControl, props) => {
      this.controlClickHandler(selectedControl);
    }



    let that = this;

    let items = {
      copy: {
        name: "Copy",
        icon: "fa-file-o",
        callback: function (key, opt) {
          that.lastCopyElement = that.selectedProps;
        }
      },
      duplicate: {
        name: "Duplicate",
        icon: "fa-clone",
        callback: function (key, opt) {
          that.copy(that.selectedProps, null, null, null, false);
        }
      },
      repete: {
        name: "Repeat On Each Page",
        icon: "fa-clone",
        callback: function (key, opt) {

          for (let j = 1; j <= that.totalpages; j++) {

            if (j == that.selectedProps.dataset.page) continue;

            that.copy(that.selectedProps, parseFloat(that.selectedProps.style.left), parseFloat(that.selectedProps.style.top), j, false);
            that.showThumbnailCount(j);
          }
        }
      }
      ,
      delete: {
        name: "Delete",
        icon: "fa-trash-o",
        callback: function (key, opt) {

          that.removeControl(false);
        }
      },
      deletegroup: {
        name: "Delete Group",
        icon: "fa-trash-o",
        callback: function (key, opt) {

          that.removeControl();
        }
      }
    }

    if (type == 'radio' || type == 'checkbox') {
      delete items.duplicate
      delete items.repete
    } else {
      delete items.deletegroup
    }

    $.contextMenu({
      selector: '#' + id,
      items
    });


    if (defaultselected) {
      let propsa = that.controlClickHandler(prop);
      that.onObjectAdded.emit(propsa);
      that.evtAddRemoveControl(page, prop)
    }
    that.onModify(prop);
    return id;
  }

  controlClickHandler = function (d) {

    let removeAddplus = null;

    if (this.selectedProps && this.selectedProps.dataset.group) {
      if (this.selectedProps.dataset.group == d.dataset.group) {
        removeAddplus = false
      } else if (this.selectedProps.id == d.id) {
        return false
      }
    }

    this.removeSelection();
    this.selectedControl = d;
    this.selectedProps = this.getExternalProp(this.selectedControl.dataset.page, this.selectedControl.id);
    this.addSelection(removeAddplus);
    this.onObjectSelected.emit(this.selectedProps);//

    this.showPropertiesF(d);
    return this.selectedProps;
  }

  onModify(e) {
    this.isNewData = true;
  }

  duplicate() {
    this.copy(this.selectedProps, null, null, null, false);
  }

  copyt() {
    this.lastCopyElement = this.selectedProps;
  }

  pastet() {
    this.paste()
  }

  paste(x = null, y = null) {
    if (this.lastCopyElement) {
      x = x || this.lastCopyElement.dataset.style.x;
      y = y || this.lastCopyElement.dataset.style.y;

      this.copy(this.lastCopyElement, x, y, this.page);
    }
  }


  selectedControl = null;
  selectedProps = null;

  addSelection(isRemoveplus = null) {

    if (this.selectedProps != null) {
      if (this.selectedProps.dataset.type == 'radio') {
        $("div[data-group='" + this.selectedProps.dataset.group + "']").addClass('act')
        if (!isRemoveplus) {
          this.appendPlus();
        }
        this.optionShowHide.copy = false;
      } else if (this.selectedProps.dataset.type == 'checkbox') {
        $("div[data-group='" + this.selectedProps.dataset.group + "']").addClass('act')
        if (!isRemoveplus) {
          this.appendPlus();
        }
        this.optionShowHide.copy = false;
      } else {
        this.optionShowHide.copy = true;
      }
      $('#' + this.selectedProps.id).addClass('active')
    }
  }

  removeSelection() {
    this.removePlus();
    if (this.selectedProps != null) {
      if (this.selectedProps.dataset.type == 'radio') {

        $("div[data-group='" + this.selectedProps.dataset.group + "']").removeClass('act')

      } else if (this.selectedProps.dataset.type == 'checkbox') {
        $("div[data-group='" + this.selectedProps.dataset.group + "']").removeClass('act')

      }
      $('#' + this.selectedProps.id).removeClass('active');
      this.selectedControl = null;
      this.onObjectDeselected.emit(this.selectedProps);
      this.hideProperties();
    }
  }

  clearAll() {
    this.askConfirmation('Confirmation', "Do you really want to clear all pages?").then(() => this.removeAllControls()).catch(() => { });

  }

  removeAllControls() {
    let pages = Object.keys(this.externalProp);
    for (let p = 0; p < pages.length; p++) {
      const page = pages[p];


      let components = this.externalProp[page];
      if (components) {
        let ids = Object.keys(components)
        for (let index = 0; index < ids.length; index++) {
          const element = components[ids[index]];
          this.removeControl(false, element)
        }
      }
    }
    this.externalProp = {};

  }

  removeControl(isgroup = true, control = null) {

    let ctrl = control || this.selectedProps;
    if (isgroup && ctrl.dataset.type == 'radio' || ctrl.dataset.type == 'checkbox') {

      $(`#cpage${ctrl.dataset.page}`).find(`[data-group="${ctrl.dataset.group}"]`).remove();

      let items = this.externalProp[ctrl.dataset.page][ctrl.dataset.group].dataset['groupids']

      for (let i = 0; i < items.length; i++) {
        const ids = items[i];
        delete this.externalProp[ctrl.dataset.page][ids];

      }
    } else {
      $('#' + ctrl.id).remove();
      delete this.externalProp[ctrl.dataset.page][ctrl.id];
    }

    this.hideProperties();
    this.evtAddRemoveControl(ctrl.dataset.page, ctrl)
    this.onObjectRemoved.emit(this.selectedProps);
    this.onModify(ctrl);
  }

  plusicon = '<div id="plusicon" style="z-index: 1111111;position: absolute;top: -25px;color: #ffffff;background: #2563d1;border: 1px solid #236cff;height: 17px;width: 17px;text-align: center;font-size: 15px;display: flex;justify-content: center;align-items: center;background-image: linear-gradient(315deg, #004fdc 0%, #5281d8 74%);border-radius: 50%;"><i class="fa fa-plus"></i></div>'

  lastPos = null;
  plusHandler = (e, t) => {

    if (t.selectedProps.dataset.type == 'checkbox') {
      let left = parseFloat(t.selectedProps.style.left);
      let top = parseFloat(t.selectedProps.style.top);
      let position = {
        left: left,
        top: top + 20
      };
      if (t.lastPos) {
        position = t.lastPos;
      }
      position = {
        left: position.left,
        top: position.top
      }
      if (position.left < 20) {
        position.left += 20
        position.top -= 20
      }
      if (position.top < 20) {
        position.top = 30
      }
      t.lastPos = position;

      t.addControlsHtml(t.selectedProps.dataset, t.selectedProps.dataset.page, position, t.selectedProps.dataset.type, t.selectedProps.dataset.group);

      t.addSelection(true)
    } else if (t.selectedProps.dataset.type == 'radio') {

      let left = parseFloat(t.selectedProps.style.left);
      let top = parseFloat(t.selectedProps.style.top);
      let position = {
        left: left,
        top: top + 20
      };
      if (t.lastPos) {
        position = t.lastPos;
      }
      position = {
        left: position.left,
        top: position.top
      }
      if (position.left < 20) {
        position.left += 20
        position.top -= 20
      }
      if (position.top < 20) {
        position.top = 30
      }

      t.lastPos = position;

      t.addControlsHtml(t.selectedProps.dataset, t.selectedProps.dataset.page, position, t.selectedProps.dataset.type, t.selectedProps.dataset.group);
      t.addSelection(true)

    }


    //this.addControlsHtml()

  }

  copy(e, x = null, y = null, page = null, removeselection = false) {

    var lastCopy = e || this.selectedProps || this.lastCopyElement;
    //this.selectedControl
    // this.selectedControl 
    let props = JSON.parse(JSON.stringify(this.getExternalProp(lastCopy.dataset.page, lastCopy.id)));
    let left = x || parseFloat(lastCopy.style.left);
    let top = y || parseFloat(lastCopy.style.top);
    let position = {
      left: left,
      top: top
    };

    props.dataset.page = page || props.dataset.page;
    if (!x) {
      props.style.top += -20;
      position.top += -20;
    }
    props.dataset.name = undefined;
    props.dataset.id = undefined;

    this.addControlsHtml(props.dataset, props.dataset.page, position, lastCopy.dataset.type, lastCopy.dataset.group, props.style, props, false, removeselection, true);

  }

  appendPlus() {
    let that = this;
    $('#' + this.selectedProps.id).append(this.plusicon);
    $('#plusicon').bind('click.plusevt', function (e) {
      e.preventDefault();

      that.plusHandler(e, that);
      return false;
    })
  }

  removePlus() {
    let g = $('#plusicon')
    g.unbind('click.plusevt');
    g.remove()
    this.lastPos = null

  }

  getExternalProp(page, id) {
    return this.externalProp[page] ? this.externalProp[page][id] : undefined;
  }

  setExternalProp(page, id, prop) {
    if ((typeof (this.externalProp[page]) === 'object' && Array.isArray(this.externalProp[page]))) {
      this.externalProp[page] = {};
    }
    if (prop.extras && Array.isArray(prop.extras)) {
      prop.extras = Object.assign({}, prop.extras);
    }
    this.externalProp[page][id] = prop;
    this.onModify(this.selectedProps);
    console.log(this.isNewData)
  }

  showPropertiesF(el: any, isfirst = false) {

    let control = this.controls.find((a) => {
      return a.type === el.dataset.type;
    })




    var extprop = this.getExternalProp(this.selectedProps.dataset.page, this.selectedProps.id);

    this.selectedField['name'] = control.text;
    this.selectedField['icon'] = control.icon;
    this.selectedField['ctype'] = control.type;
    this.selectedField['prop'] = []
    this.selectedField['postion'] = {};
    this.selectedField['dataprop'] = []
    for (let i = 0; i < control.propsallow.length; i++) {
      const element = control.propsallow[i];

      let assg = this.propBehaviour[element] || {}
      let eltyp = assg.dtype;

      let val: any = '';
      let extras: any;
      let defval: any;
      if (assg.dtype == 'external') {
        if (extprop) {
          if (extprop.extras && extprop.extras[assg.type]) {

            val = extprop.extras[assg.type].val;
            extras = extprop.extras[assg.type].extra;
            defval = extprop.extras[assg.type].defval;
          }
        }
      }
      if (element == 'text') {

        //val = $(el).find('span').text();
        //extprop[element] = val;
        val = extprop[element];
      } else if (['width', 'top', 'left', 'fontSize'].indexOf(element) > -1) {
        if (eltyp === 'style') {
          // val = parseFloat(el.style[element])
          // extprop.style[element] = val;
          val = extprop.style[element];
        }
      }
      else {
        if (eltyp === 'dataset') {
          // if (assg.cast == 'number') {
          //     val = parseFloat(el.dataset[element] || assg.default)
          // } else if (assg.cast == 'string') {
          //     val = (el.dataset[element] || assg.default)
          // } else if (assg.cast == 'boolean') {
          //     val = (el.dataset[element] || assg.default) == 'true' ? true : false
          // }
          //extprop.dataset[element] = va
          val = extprop.dataset[element];
        } else if (eltyp === 'style') {
          // val = el.style[element]
          // extprop.style[element] = val;
          val = extprop.style[element];
        } else if (eltyp === 'prop') {
          // val = el[element]
          // extprop[element] = val;
          val = extprop[element];
        }
      };
      // if (type == 'ddl' || type == 'text' || type == 'note') {
      //     let o = e.getObjects();
      //     let text = o[0];
      //     if (['text', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight'].indexOf(element) > -1) {
      //         val = text[element];
      //     }


      // }
      let propsdata = {
        key: element,
        value: val,
        display: assg.display,
        append: assg.append,
        type: assg.type,
        propdata: eltyp,
        extras: extras,
        defval: defval,
        group: assg.group

      }
      if (element == 'top' || element == 'left') {
        this.selectedField['postion'][element] = propsdata;
      }

      this.selectedField['prop'].push(propsdata);

      //set Data prop according to control



    }

    // this.setExternalProp(this.selectedControl.dataset.page, this.selectedControl.id, extprop);
    if (isfirst) {
      let findRecipient = this.selectedField['prop'].find(a => {
        return a.key == 'recipient'
      })
      // if(findRecipient){
      //   if(findRecipient.value == "" && this.recipients.length  > 0){
      //     let fre = this.recipients[0];
      //     this.updateExternal(e, 'recipient', propsdata)
      //   }
      // }


    }
    $('.drawer').removeClass('is-hide').addClass('is-visible').addClass('is-active');

    this.zone.detectChanges();
  }

  updateProperties(item) {



    let selCtrl = $('#' + this.selectedProps.id)[0];
    var extprop = this.getExternalProp(this.selectedProps.dataset.page, this.selectedProps.id);



    // for (let i = 0; i < this.selectedField['prop'].length; i++) {
    const element = item;//this.selectedField['prop'][i];
    if (element.key == 'text') {
      $('#' + this.selectedProps.id).find('span').text(element.value);
      this.selectedProps.dataset[element.key] = element.value;
      extprop[element.key] = element.value;
      extprop['val'] = element.value
    }
    if (element.key == 'label') {
      $(`#${this.selectedProps.id}`).find('.label').text(element.value)
    } else if (element.propdata == 'dataset') {
      if ((this.selectedProps.dataset.type == 'radio' || this.selectedProps.dataset.type == 'checkbox')) {
        if (element.key == 'name') {
          $(`#cpage${this.selectedProps.dataset.page}`).find(`[data-group="${this.selectedProps.dataset.group}"]`).attr('data-name', element.value)
          extprop.dataset[element.key] = element.value;
          this.selectedProps.dataset[element.key] = element.value;


          let items = this.externalProp[this.selectedProps.dataset.page][this.selectedProps.dataset.group].dataset['groupids']

          for (let i = 0; i < items.length; i++) {
            const ids = items[i];
            this.externalProp[this.selectedProps.dataset.page][ids].dataset['name'] = this.selectedProps.dataset.name;

          }

        } else if (element.key == 'checked') {
          if (this.selectedProps.dataset.type == 'radio') {
            $(`#cpage${this.selectedProps.dataset.page}`).find(`[data-group="${this.selectedProps.dataset.group}"]`).attr('data-checked', 'false');
            let items = this.externalProp[this.selectedProps.dataset.page][this.selectedProps.dataset.group].dataset['groupids']

            for (let i = 0; i < items.length; i++) {
              const ids = items[i];
              this.externalProp[this.selectedProps.dataset.page][ids].dataset['checked'] = false;
              this.externalProp[this.selectedProps.dataset.page][ids].val =  this.externalProp[this.selectedProps.dataset.page][this.selectedProps.id].dataset['value'];

            }
          }

          if (element.value == true) {
            $('#' + this.selectedProps.id).find('input').prop('checked', true);
          } else {
            $('#' + this.selectedProps.id).find('input').prop('checked', false);
          }

          extprop.dataset[element.key] = element.value;
          selCtrl.dataset[element.key] = element.value;
        } else if (this.selectedProps.dataset.type == 'radio' && element.key == 'value' && this.selectedProps.dataset.checked) {
          let items = this.externalProp[this.selectedProps.dataset.page][this.selectedProps.dataset.group].dataset['groupids']
          for (let i = 0; i < items.length; i++) {
            const ids = items[i];
            this.externalProp[this.selectedProps.dataset.page][ids].val = element.value;
          }

        } else {
          selCtrl.dataset[element.key] = element.value;
          extprop.dataset[element.key] = element.value;
        }

      }
      else {
        selCtrl.dataset[element.key] = element.value;
        extprop.dataset[element.key] = element.value;
      }
    } else if (element.propdata == 'style') {
      selCtrl.style[element.key] = element.value + element.append;
      extprop.style[element.key] = element.value;
    } else if (element.propdata == 'prop') {
      selCtrl[element.key] = element.value;
      extprop[element.key] = element.value;
    }

    // if (this.selectedField['ctype'] == 'ddl' || this.selectedField['ctype'] == 'note' || this.selectedField['ctype'] == 'text') {
    //     let text = this.selectedObject.item(0);

    //     if (['text', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight'].indexOf(element.key) > -1) {
    //         text.set(element.key, element.value)
    //     } else {
    //         this.selectedObject[element.key] = (element.type === 'number' ? parseInt(element.value) : element.value);

    //     }


    // } else {
    //     this.selectedObject[element.key] = (element.type === 'number' ? parseInt(element.value) : element.value);
    // }
    // }
    this.setExternalProp(this.selectedProps.dataset.page, this.selectedProps.id, extprop);
    //console.log(this.selectedObject);
    // this.selectedObject.canvas.renderAll();


  }

  externalProp = {};
  updateExternal(e, proptype, item) {
    if (proptype == 'recipient') {
      item.value = e.name;
      item.color = e.color;
    }
    var extprop = this.getExternalProp(this.selectedProps.dataset.page, this.selectedProps.id);
    if (proptype == 'ddlprop' || proptype == 'recipient') {

      let v = item.value.trim().replace(/(\r\n|\n|\r)/gm, "");
      if (this.selectedProps.dataset.type == 'checkbox' || this.selectedProps.dataset.type == 'radio') {

        let items = this.externalProp[this.selectedProps.dataset.page][this.selectedProps.dataset.group].dataset['groupids']

        for (let i = 0; i < items.length; i++) {
          const ids = items[i];
          this.controlSet[ids].setBgColor(item.color);
          let it = this.externalProp[this.selectedProps.dataset.page][ids];
          if (!it.extras || !it.extras[proptype]) {
            it.extras[proptype] = { val: '', extra: [], defval: '' };
          }
          it.extras[proptype].val = v
          it.extras[proptype].extra = v.split(';')


        }
        item.extras = extprop.extras[proptype].extra;
        item.val = v;
      } else {
        if (!extprop.extras || !extprop.extras[proptype]) {
          extprop.extras[proptype] = { val: '', extra: [], defval: '' };
        }
        extprop.extras[proptype].val = v
        extprop.extras[proptype].extra = v.split(';')
        extprop.extras[proptype].color = item.color;
        item.extras = extprop.extras[proptype].extra;
        item.val = v;
        extprop.extras[proptype].defval = item.defval;
        if (item.defval) {
          extprop.val = item.defval;
        }
        this.setExternalProp(this.selectedProps.dataset.page, this.selectedProps.id, extprop);
        if (proptype == 'recipient') {
          debugger
          this.controlSet[this.selectedProps.id].setBgColor(item.color);
        }
      }
    }

    this.zone.detectChanges();
  }

  hideProperties() {
    $('.drawer').removeClass('is-visible').removeClass('is-active').addClass('is-hide');
  }

  offlineSave() {
    if (this.offlineType == 'localstorage') {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.externalProp));
    } else if (this.offlineType == 'event') {
      this.onOfflineStore.emit(this.externalProp);
    } else {

    }
  }

  dialogtext = '';
  askConfirmation(title, text) {
    this.dialogtext = text;
    return new Promise((res, rej) => {

      $("#dialog").dialog({
        modal: true,
        autoOpen: true,
        title: title,
        width: 350,
        height: 160,
        buttons: [
          {
            id: "Yes",
            text: "Yes",
            click: function () {
              res()
              $(this).dialog('close');
            }
          },
          {
            id: "No",
            text: "No",
            click: function () {
              $(this).dialog('close');
              rej()
            }
          }
        ]
      });

    })
  }

  openClosePropSection(grp) {
    if (!grp.close) {
      grp.close = true
    } else {
      grp.close = false
    }
    this.zone.detectChanges();
  }

  makeColor(colorNum, colors) {
    if (colors < 1) colors = 1;
    // defaults to one color - avoid divide by zero
    return colorNum * (360 / colors) % 360;
  }

  loopEachControl(isbreak, callback) {
    let pages = Object.keys(this.externalProp);
    for (let i = 0; i < pages.length; i++) {
      if (isbreak) break;
      if (!this.externalProp[pages[i]] || this.externalProp[pages[i]] == null) continue;
      let ele = Object.keys(this.externalProp[pages[i]])
      let lastprop = this.externalProp[pages[i]];
      for (let j = 0; j < ele.length; j++) {
        const propele = lastprop[ele[j]];
        if (isbreak) break;
        if (propele.type == "radio" || propele.type == "checkbox") {
          if (propele.dataset.groupids) {
            callback(propele, lastprop);
            continue
          } else {
            continue
          }
        }
        callback(propele, lastprop);
      }
    }
  }

}

@NgModule({
  imports: [CommonModule, FormsModule, PdfViewerModule],
  exports: [iDocsigneditorComponent],
  declarations: [iDocsigneditorComponent, GroupByPipe, CustomDdlComponent]
})

export class iEditorModule { }