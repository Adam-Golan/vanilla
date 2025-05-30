import { ComponentDecorator } from "@decorators";
import { FormComponent } from "../base";
import { IRadioProps } from "../../interfaces";

import './radio.scss';

@ComponentDecorator
export class Radio extends FormComponent<IRadioProps> {
    declare field: HTMLInputElement;
    protected createMe(): HTMLFieldSetElement {
        this.field = this.cElem('input');
        const [fieldset, legend] = this.cAlot([{ tag: 'fieldset' }, { tag: 'legend' }]), children: HTMLElement[] = [legend];
        fieldset.className = 'form-group';
        legend.innerHTML = this.props.label;
        for (const radio of this.props.values) {
            const [label, inp, span] = this.cAlot([{ tag: 'label' }, { tag: 'input' }, { tag: 'span' }]);
            inp.type = 'radio';
            inp.name = this.props.name;
            inp.id = inp.value = label.htmlFor = span.innerText = radio;
            if (this.props.value === radio) inp.checked = true;
            inp.oninput = () => inp.checked ? this.onInput(inp.value) : null;
            label.append(inp, span);
            children.push(label);
        }
        fieldset.append(...children);
        return fieldset;
    }
}