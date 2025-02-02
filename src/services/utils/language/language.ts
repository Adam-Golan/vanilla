// Activate if no need in dynamic import.
// import { texts } from '../../../asstets/i18n/en/lang';

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
        try {
            if (import.meta.env.DEV) {
                const { texts } = await import(/* @vite-ignore */`../../../i18n/${lang}/lang`);
                this.texts = texts;
            } else {
                const response = await fetch(`/lang/${lang}/lang.js`);
                console.log(response);
                // this.texts = response.json();
            }
        } catch (err) {
            this.texts = {};
            console.error(err);
        }
    }
}