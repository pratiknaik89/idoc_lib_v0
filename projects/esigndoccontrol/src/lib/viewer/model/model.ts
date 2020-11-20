

export interface Recipient {
    val: string;
    extra: string[];
}

export interface Ddlprop {
    defval: string;
    extra: string[];
    val: string
}

export interface Extras {
    recipient?: Recipient;
    ddlprop?: Ddlprop
}

export interface Style {
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    width?: number;
    height?: number;
    left: number;
    top: number;
}

export interface Dataset {
    name: string;
    type: string;
    page: number;
    fieldtype: string;
    group?: string;
    groupids?: string;
    maxlength?: number;
    require?: boolean;
    value?: string;
    checked?: boolean;
    tooltip?: string;
    readonly: boolean;
    dateFormat?: string;
    lat?: number;
    lon?: number;
    placeholder?: string;
}

export interface Control {
    extras?: Extras;
    style: Style;
    dataset: Dataset;
    type: controlType;
    id: string;
    text?: string;
    val?: any;
    isviewonly?: boolean;
}


export interface Font {
    name: string
    url: string
}


export interface ISign {
    name: string
    url: string
    type?: string
}

export enum controlType {
    text = 'text',
    note = 'note',
    sign = 'sign',
    checkbox = 'checkbox',
    radio = 'radio',
    attach = 'attach',
    pic = 'pic',
    loc = 'loc',
    qr = 'qr',
    br = 'br',
    ddl = 'ddl',
    initial = 'initial',
    signdate = 'signdate'
}


export enum controlValidateType {
    date = 'date',
    number = 'number'
}