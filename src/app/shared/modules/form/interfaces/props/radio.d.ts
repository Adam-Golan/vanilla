import { Props } from "./base";

export interface IRadioProps extends Omit<Props, 'placeholder' | 'autocomplete'> {
    label: string;
    value?: string;
    values: string[];
}

export interface IRadioElement {
    type: 'radio';
    props: IRadioProps;
}