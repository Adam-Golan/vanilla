// Activate if no need in dynamic import.
// import { texts } from '../../../asstets/i18n/en/lang';
const languages = import.meta.glob('../../../../dist/lang/*/lang.js');

export class Language {
    texts: any;

    getTexts(path: string): any {
        return path.includes('/') ? this.locateTexts(path.split('/')) : this.texts[path];
    }

    private locateTexts(paths: string[]): any {
        let ref = this.texts;
        for (const subPath of paths) ref = ref[subPath];
        return ref;
    }

    async importTexts(lang: string): Promise<void> {
        // Deactivate if no need in dynamic import.
        const path = `../../../../dist/lang/${lang}/lang.js`;
        try {
            this.texts = import.meta.env.DEV ?
                (await import(/* @vite-ignore */`../../../i18n/${lang}/lang`)).texts
                : languages[path]
                    ? (await languages[path]()).texts
                    : console.error(`Language file not found: ${lang}`);
        } catch (err) {
            this.texts = {};
            console.error(err);
        }
    }
}