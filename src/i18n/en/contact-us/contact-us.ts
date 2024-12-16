import { IContactUsBlock } from "@pages/contact-us/types";
import { IFooterConfig } from "@shared/modules/footer/types";
import { IHeaderText } from "@shared/modules/hero/components/header/lang";

export const contactus = {
    HEADER: {
        header: 'Contact Us - We\'re Here (Probably)',
        subHeader: 'Get in Touch'
    } as IHeaderText,
    INTRO: 'Got questions, complaints, or just feel like yelling at someone? We\'re all ears (except when we\'re not). Pick your favorite way to reach out:',
    BLOCKS: [
        {
            header: 'Email',
            content: ['📧 <span class="highlight">support@we-ignore-you.com</span>', 'Emails are our favorite! We promise to read your message... eventually.']
        },
        {
            header: 'Phone',
            content: ['📞 <span class="highlight">(123) 456-7890</span>', 'Call us during working hours, which are random and unpredictable. Good luck!']
        },
        {
            header: 'Social Media',
            content: ['🐦 Twitter: <a target="_blank" href="https://twitter.com/wenotlistening">@WeNotListening</a>', '📸 Instagram: <a target="_blank" href="https://instagram.com/justkiddinghelp">@JustKiddingHelp</a>', 'Slide into our DMs... if you dare.']
        },
        {
            header: 'Visit Us',
            content: ['📍 404 Nowhere Lane, Imaginary City, UN 00000', 'Our office is located in a top-secret location. If you find us, you get a free cookie!']
        },
        {
            header: 'Carrier Pigeon',
            content: ['🐦 Send your bird to the coordinates: 51.5074° N, 0.1278° W', 'Please note: delivery times may vary depending on pigeon motivation.']
        }
    ] as IContactUsBlock[],
    FOOTER: {
        copyrights: 'Copyright 2525 Ebenezer Scrooge. All rights reserved.'
    } as IFooterConfig
}