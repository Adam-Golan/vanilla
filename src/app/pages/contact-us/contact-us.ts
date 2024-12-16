import { Page, PageDecorator } from "@decorators";
import type { texts } from "@i18n/en/lang";
import { Fluid, Form } from "@shared";
import { Header } from "@shared/modules/hero/components";
import { IFormMap, IFormBtns } from "@shared/modules/form/interfaces";

import './contact-us.scss';

@PageDecorator
export class ContactUs extends Page<typeof texts.contactus> {
    protected async init() {
        const fluid = new Fluid();
        const intro = this.cElem('p');
        intro.classList.add('intro');
        intro.innerText = this.texts.INTRO;
        this.createBlocks(fluid);
        fluid.append(this.createForm());
        this.append(new Header(this.texts.HEADER), intro, fluid);
        super.init();
        this.showPage();
    }

    private createBlocks(fluid: Fluid): void {
        for (const block of this.texts.BLOCKS) {
            const conatainer = this.createContainer('contact-method');
            const header = this.cElem('h3');
            header.innerText = block.header;
            conatainer.append(header);
            for (const content of block.content) {
                const para = this.cElem('p');
                para.innerHTML = content;
                conatainer.append(para);
            }
            fluid.append(conatainer);
        }
    }

    private createForm(): Form {
        const map: IFormMap = {
            legend: 'you can nag us directly',
            fields: {
                name: {
                    type: "input",
                    props: {
                        name: "name",
                        placeholder: "Your Name",
                        required: true
                    }
                },
                subject: {
                    type: "input",
                    props: {
                        name: "subject",
                        placeholder: "Subject",
                        required: true
                    }
                },
                email: {
                    type: "input",
                    props: {
                        name: "email",
                        placeholder: "Email",
                        required: true
                    }
                },
                message: {
                    type: "textarea",
                    props: {
                        name: "message",
                        placeholder: "Message",
                        required: true
                    }
                }
            }
        };
        const btns: IFormBtns = [
            { text: 'send', type: 'submit', cb: () => alert('The Matrix has you!') }
        ];
        return new Form(map, btns);
    }
}