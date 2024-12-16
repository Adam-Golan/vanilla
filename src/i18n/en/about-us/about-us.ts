import { ISeperatorText } from "@shared/components/seperator/lang";
import { ISoonText } from "@shared/components/soon/lang";
import { IImageCard } from "@shared/modules/card/lang";
import { IHeaderText } from "@shared/modules/hero/components/header/lang";

export const aboutus = {
    HEADER: {
        header: 'about us',
        subHeader: 'The tall tale of our company'
    } as IHeaderText,
    SEPERATORS: {
        team: {
            header: 'our team'
        },
        mission: {
            header: 'our mission'
        }
    } as { [k: string]: ISeperatorText },
    MISSION: 'Our Mission At QuantumFluff.com, we believe that innovation lives in the unexpected spaces between logic and imagination. Our journey began with a simple yet revolutionary concept: to transform the ordinary into the extraordinary, one pet video at a time. We\'re not just a technology company; we\'re pioneers of digital randomness, creators of algorithms that see beyond the conventional, and believers in the untapped potential of seemingly mundane moments. Our mission is to prove that creativity knows no bounds, that technology can be both intelligent and playful, and that sometimes the most profound insights come from watching a cat knock over a glass of milk. Our commitment is to challenge the status quo, to bring joy and unexpected wonder to the digital landscape, and to remind the world that innovation doesn\'t always look like what you expect. We\'re here to turn the ordinary into the extraordinary, one quantum moment at a time.',
    CARDS: [
        {
            image: '/about-us/tonystark.webp',
            title: 'Tony Stark',
            description: 'CEO, Founder, and President'
        },
        {
            image: '/about-us/natasharomanoff.jpg',
            title: 'Natasha Romanoff',
            description: 'CFO, Chief Financial Officer, and Treasurer'
        },
        {
            image: '/about-us/steverogers.webp',
            title: 'Steve Rogers',
            description: 'CTO, Chief Technology Officer, and Chief Architect'
        },
        {
            image: '/about-us/thor.jpg',
            title: 'Thor Odinson',
            description: 'COO, Chief Operating Officer, and Chief Marketing Officer'
        },
        {
            image: '/about-us/peterparker.webp',
            title: 'Peter Parker',
            description: 'Intern, Student, and Teacher'
        }
    ] as IImageCard[],
    SOON: {
        pageName: 'about us'
    } as ISoonText,
}