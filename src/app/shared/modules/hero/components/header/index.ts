import { Component, ComponentDecorator } from "@decorators";
import { IHeaderText } from "./lang";

import './header.scss';

@ComponentDecorator
export class Header extends Component<IHeaderText> {
    protected init(): void {
        const [header, subHeader] = this.cAlot([{ tag: 'h1' }, { tag: 'h3' }]);
        header.innerHTML = this.config.header;
        subHeader.innerHTML = this.config.subHeader;
        this.append(header, subHeader);
    }
}