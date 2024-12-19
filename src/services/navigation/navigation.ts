import { Loader } from "@shared";
import { Device } from "@services/utils/device/device";
import { Language } from "@services/utils/language/language";
import type { Page } from "@decorators";
import type { State } from "@services/state/state";
import { StateKeys } from "@constants/stateKeys.constant";
import { IPages, IPagesTree } from "./types";
import { appConfig } from "app.config";

export class Navigation {
    private loader = new Loader({});
    private currentPage: Page<any>;
    private cachedPages: Map<string, Page<any>> = new Map();
    private i18n = new Language();
    private history: string[] = [];
    public tree: IPagesTree;

    constructor(private state: State, private ref: HTMLElement, private pages: IPages, private homePage = '/home', public basePath = '/') {
        window.addEventListener('popstate', () => {
            if (location.hash.length) return;
            this.history[this.history.length - 2]
                ? this.loadingProcess(this.history[this.history.length - 2])
                : this.fisrtLoad();
        });
        window.addEventListener('hashchange', () => history.replaceState(null, '', window.location.pathname));
        this.tree = this.createTree();
        this.subscribes();
    }

    // ------------------------------
    // Initiation section.
    // ------------------------------
    private subscribes(): void {
        // Page Navigation.
        this.state.subscribe(StateKeys.navigate, (path) => this.loadingProcess(path));
        // Load Page.
        this.state.subscribe(`${this.basePath}:${StateKeys.contentReady}`, () => this.ref.replaceChild(this.currentPage, this.loader));
    }

    private createTree(pages: IPages = this.pages): IPagesTree {
        const tree: IPagesTree = [];
        pages.forEach((value, key) => {
            value.getPages
                ? tree.push({ [key]: this.createTree(value.getPages()) })
                : tree.push(key);
        });
        return tree;
    }

    // ------------------------------
    // Texts handles.
    // ------------------------------
    public async importTexts(): Promise<void> {
        await this.i18n.importTexts(Device.lang);
        this.fisrtLoad();
    }

    public setTexts(texts: any): void {
        this.i18n.texts = texts;
        this.fisrtLoad();
    }

    // ------------------------------
    // Loading section.
    // ------------------------------
    public reload(): void {
        this.ref.replaceChild(this.loader, this.currentPage);
        this.navigationLogic(location.pathname);
    }

    private fisrtLoad(): void {
        // this.history = [];
        if (location.pathname === this.basePath) this.pushState(this.homePage);
        Array.from(this.ref.children).forEach(child => !child.classList.contains('navbar') ? this.ref.removeChild(child) : null);
        this.ref.append(this.loader);
        // this.log('fisrtLoad', location.pathname);
        this.navigationLogic(location.pathname);
    }

    private loadingProcess(path: string): void {
        if (path.slice(1).remove('-') === this.currentPage?.id) return;
        // this.log('loadingProcess', path);
        path = this.searchFullPath(path) || this.homePage;
        this.pushState(path);
        try {
            this.ref.replaceChild(this.loader, this.currentPage);
            this.navigationLogic(path);
        } catch (_) {
            this.fisrtLoad();
        }
    }

    private navigationLogic(path: string): void {
        path = this.findPage(path);
        // this.log('navigationLogic', path);
        document.title = `${appConfig.siteURL.replace(/(https?:\/\/|www\.)/, '').sliceFrom('.').titleCase()} | ${(path).slice(1).addSpaces('-').titleCase()}`;
        if (this.cachedPages.has(path)) {
            this.currentPage = this.cachedPages.get(path)!;
            this.ref.replaceChild(this.currentPage, this.loader);
            if (this.currentPage.navigation) this.currentPage.navigation.reload();
        } else {
            const Page = this.pages.get(path)!;
            if (Page.name === this.currentPage?.constructor.name && !location.pathname.includes(path)) return;
            const texts = this.i18n.getTexts(path.remove(/(\-|\/)/));
            this.cachedPages.set(path, new Page(texts, this.state));
            this.currentPage = this.cachedPages.get(path)!;
        }
    }

    // ------------------------------
    // Utilities.
    // ------------------------------
    private searchFullPath(path: string, tree = this.tree): string | null {
        // this.log('searchPath', path);
        const fullPath: string[] = [];
        for (const branch of tree) {
            if (typeof branch !== 'string')
                for (const key of Object.keys(branch)) {
                    const result = this.searchFullPath(path, branch[key]);
                    if (result) fullPath.push(key, result);
                }
            else if (branch === path) fullPath.push(path);
        }
        return fullPath.length ? fullPath.join('') : null;
    }

    private findPage(path: string): string {
        // this.log('findPage', path);
        if (path === this.basePath) return this.homePage;
        const pathArr = path.slice(1).split('/');
        for (let i = 0; i < pathArr.length; i++) if (this.pages.has(`/${pathArr[i]}`)) return `/${pathArr[i]}`;
        return this.homePage;
    }

    private pushState(path: string): void {
        this.history.push(path);
        window.history.pushState(null, '', `${this.basePath === '/' ? '' : this.basePath}${path}`);
    }

    private log(fnName: string, path: string): void {
        console.log('base path: ', this.basePath, `\n${fnName}: `, path, '\n-----------------------------');
    }
}