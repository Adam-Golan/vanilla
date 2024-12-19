import { Home, AboutUs, ContactUs} from "@pages"
import type { IMetaTags, OGCard} from "@services"
import type { IPage, IPages } from "@services/navigation/types";

export const appConfig: AppConfig = {
    siteURL: 'https://vanilla.com', // Replace with your site's actual URL
    routes: new Map<string, IPage>([
        ['/home', Home],
        ['/contact-us', ContactUs],
        ['/about-us', AboutUs],
    ]),
    meta: {
        description: "Welcome to Vanilla, a fast and reliable web development frame.",
        keywords: "Vanilla, framework, fast development",
        author: "Adam Golan"
    },
}

interface AppConfig {
    siteURL: string;
    routes: IPages,
    meta: IMetaTags,
    OGCard?: OGCard,
}