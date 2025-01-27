import { Page, PageDecorator } from "@decorators";
import type { texts } from "assets/i18n/en/lang";
import { Card, Fluid, Seperator } from "@shared";
import { Header } from "@shared/modules/hero/components";

import './about-us.scss';

@PageDecorator
export class AboutUs extends Page<typeof texts.aboutus> {
    protected async init() {
        const container = new Fluid();
        const para = this.cElem('p');
        para.innerText = this.texts.MISSION;
        container.append(new Seperator(this.texts.SEPERATORS.mission), para, new Seperator(this.texts.SEPERATORS.team));
        this.append(new Header(this.texts.HEADER), container);
        for (const card of this.texts.CARDS) container.append(new Card('profile', card));
        super.init();
        this.showPage();
    }
}