
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

// export const CUSTOM_DDL_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => CustomDdlComponent),
//     multi: true
// };


@Component({
    selector: 'app-ddl',
    template: `
    <div class="dropdown">
    <button class="dropbtn" title="selectdItem" (click)="ddltoggle()"><div class="circleColor" [style.background]="getColor(selectdItem)"></div> {{selectdItem || 'Select'}}  <i class="bottom-arrow fa fa-chevron-down"></i></button>
    <div id="{{ids}}" class="dropdown-content">
        <a (click)="onItemSelected(item)" [ngClass]="{'activeitem': selectdItem ==item.name}" *ngFor="let item of items"><div class="circleColor" [style.background]="item.color"></div> {{item.name}}</a>
    </div>
    </div>

       

    `,
    styles: [`
    .dropbtn {
        background-color: #fff;
        color: #333;
        padding: 5px;
        font-size: 13px;
        border: none;
        cursor: pointer;
        display: block;
        border: 1px solid #ccc;
        width: 100%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding-right: 19px;
        padding-left:23px;
      }
      .circleColor{
        background: rgba(255, 0, 0, 0.6);
        height: 13px;
        width: 13px;
        border-radius: 50%;
        position: absolute;
        left: 7px;

      }
      .bottom-arrow{
        position: absolute;
        right: 6px;
        background: #fff;
      }
      .dropbtn:hover, .dropbtn:focus {
        /*background-color: #3e8e41;*/
      }
      
      .dropdown {
        
        position: relative;
        display: inline-block;
        display:block;
      }
      
      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 160px;
        overflow: auto;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        right: 0;
        z-index: 1;
      }
      
      .dropdown-content a {
        color: #333;
        padding: 9px 16px;
        text-decoration: none;
        display: block;
        padding-left: 23px;
        font-weight: 600;
        cursor:pointer;
        position:relative;

      }
      .activeitem{
        background-color: #ccc;
      }
      .dropdown a:hover {background-color: #ddd;}
      
      .showddl {display: block;}
    
    `],
    providers: []
})
export class CustomDdlComponent implements OnInit {
    @Input('items') items: any = []
    private val: any = {}
    @Input('id') ids: any = (new Date()).getTime();
    @Input('selectdItem') selectdItem: any = {};
    @Output() onChanged: EventEmitter<any> = new EventEmitter();

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    getColor(selectdItem) {
        let itm = this.items.find(a => {
            return a.name == selectdItem
        })
        if (itm)
            return itm.color;
        return "#fff"
    }

    constructor() {


    }

    get value(): any {
        debugger
        return this.val;
    };

    set value(v: any) {
        debugger
        if (v !== this.val) {
            this.val = v;
            this.onChanged.emit(v);
        }
    }


    ngOnInit(): void {

        window.onclick = function (event: any) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('showddl')) {
                        openDropdown.classList.remove('showddl');
                    }
                }
            }
        }



    }



    setValue(item) {
        this.selectdItem = item.name;
        console.log(this.selectdItem)
        this.onChanged.emit(item);
    }
    onItemSelected(item) {
        this.selectdItem = item.name;
        this.onChanged.emit(item);
    }

    ddltoggle() {
        document.getElementById(this.ids).classList.toggle("showddl");
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.val) {
            this.val = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
