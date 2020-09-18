

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
}

export interface Control {
    extras?: Extras;
    style: Style;
    dataset: Dataset;

    type: string;
    id: string;
    text?: string;
    val?: string;
} 
