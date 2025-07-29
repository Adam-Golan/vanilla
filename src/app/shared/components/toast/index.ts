import { ComponentDecorator } from "@decorators";

import './toast.scss';

@ComponentDecorator
export class Toast extends HTMLElement {
    constructor(private ref: HTMLElement, private timeout = 2000) {
        super();
        ref.append(this);
    }
    
    showToast(msg: string, type: 'success' | 'error' | 'info' | 'warn' | 'default' = 'default'): void {
        this.innerHTML = msg;
        this.className = `toast ${type} ${this.ref === document.body ? 'body' : 'el'}`;
        this.classList.add('show');
        setTimeout(() => this.classList.remove('show'), this.timeout);
    }
}