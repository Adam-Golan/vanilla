import { ICheckboxProps } from './checkbox';

export interface ISwitchProps extends Omit<ICheckboxProps, 'required' | 'error'> {}

export interface ISwitchElement {
    type: 'switch';
    props: ISwitchProps;
}