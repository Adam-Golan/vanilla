import { IFooterConfig } from '@shared/modules/footer/types';
import { IHeroText } from '@shared/modules/hero/lang';

export const home = {
    HERO: {
        img: '/hero.jpeg',
        header: 'welcome to vanilla!',
        subHeader: 'Not a framework, but a frame to work with.',
    } as IHeroText,
    FOOTER: {
        copyrights: 'Copyright 2525 Ebenezer Scrooge. All rights reserved.'
    } as IFooterConfig
}