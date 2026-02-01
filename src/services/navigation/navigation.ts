import { Loader } from "@shared";
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
    private history: string[] = [];
    public tree: IPagesTree;
    private homePage: string;

    /**
     * Constructor for Navigation.
     *
     * @param state The state object that handles all state changes.
     * @param ref The root element of the application.
     * @param pages The list of pages to be used in the navigation.
     * @param basePath The base path for all navigation (default is '/').
     */
    constructor(private state: State, private ref: HTMLElement, private pages: IPages, public basePath = '/') {
        this.tree = this.createTree();
        this.subscribes();
        this.homePage = pages.keys().next().value || '/home';
        if (this.basePath.endsWith('/')) this.basePath = this.basePath.slice(0, -1);
    }

    // ------------------------------
    // Initiation section.
    // ------------------------------

    /**
     * Subscribes to the state events.
     *
     * Page Navigation - listen to the StateKeys.navigate event and call the loadingProcess function with the given path.
     * Load Page - listen to the StateKeys.contentReady event and replace the loader with the loaded page.
     * History - listen to the popstate event and go to the previous page if it exists.
     * Hashchange - listen to the hashchange event and replace the state with the new path.
     */
    private subscribes(): void {
        // Page Navigation.
        this.state.subscribe(StateKeys.navigate, (path: string) => this.loadingProcess(path));
        // Load Page.
        this.state.subscribe(`${this.basePath}:${StateKeys.contentReady}`, () => this.ref.replaceChild(this.currentPage, this.loader));
        window.addEventListener('popstate', () => !!location.hash ? null : this.history.at(-2) ? this.loadingProcess(this.history.at(-2)!) : this.firstLoad());
    }

    /**
     * Creates a tree structure for the pages based on the provided pages object.
     * Each key in the object is a page, and the value is either the path to the page or another object containing the subpages.
     * The returned tree is an array of strings and objects, where each string is a page path, and each object is a page with its subpages.
     * @param pages - The pages object to create the tree from. Defaults to the pages object provided in the constructor.
     * @returns The tree structure for the pages.
     */
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
    // Loading section.
    // ------------------------------
    /**
     * Reloads the current page.
     * Replaces the current page with the loader element and calls the navigation logic with the current path.
     * @remarks
     * This method is useful when you want to reload the page without pushing a new state to the browser's history.
     */
    public reload(): void {
        this.ref.replaceChild(this.loader, this.currentPage);
        this.navigationLogic(location.pathname);
    }

    /**
     * Initializes the loading process of the page.
     * If the current path is the base path, it pushes the home page to the history.
     * Removes all children of the ref element except the navbar.
     * Appends the loader to the ref.
     * Calls the navigation logic with the current path.
     */
    public firstLoad(): void {
        if (this.basePath === location.pathname) return;
        this.pushState(this.findPage(location.pathname));
        Array.from(this.ref.children).forEach(child => !child.classList.contains('navbar') ? this.ref.removeChild(child) : null);
        this.ref.append(this.loader);
        // this.log('firstLoad', location.pathname);
        this.navigationLogic(location.pathname);
    }

    /**
     * Loads the page by given path.
     * If the page with given path is already loaded, it does nothing.
     * If the page with given path is not found, it loads the homepage.
     * If the page with given path is not cached, it creates a new instance
     * of the page and caches it.
     * It also updates the browser's address bar and the page's title.
     * @param path - The path to navigate to.
     */
    private loadingProcess(path: string): void {
        if (path.slice(1).remove('-') === this.currentPage?.id) return;
        // this.log('loadingProcess', path);
        const slashIdx = path.lastIndexOf('/');
        if (slashIdx && path.slice(0, slashIdx) !== this.basePath) return;
        path = slashIdx ? path.slice(slashIdx) : this.searchFullPath(path) || this.homePage;
        this.pushState(path);
        try {
            this.ref.replaceChild(this.loader, this.currentPage);
            this.navigationLogic(path);
        } catch (_) {
            this.firstLoad();
        }
    }

    /**
     * Navigates to the given path by setting the page's title and content.
     * If the page is already cached, it simply replaces the current page
     * with the cached one. If the page is not cached, it creates a new instance
     * of the page and caches it.
     * @param path - The path to navigate to.
     */
    private navigationLogic(path: string): void {
        path = this.findPage(path);
        // this.log('navigationLogic', path);
        document.title = `${appConfig.siteURL.replace(/(https?:\/\/|www\.)/, '').sliceTo('.').titleCase()} | ${(path).slice(1).addSpaces('-').titleCase()}`;
        if (document.title.indexOf('|') === document.title.length - 1) document.title = document.title.replace('|', '');
        if (this.cachedPages.has(path)) {
            this.currentPage = this.cachedPages.get(path)!;
            this.ref.replaceChild(this.currentPage, this.loader);
            if (this.currentPage.navigation) this.currentPage.navigation.reload();
        } else {
            const Page = this.pages.get(path)!;
            if (Page.name === this.currentPage?.constructor.name && !location.pathname.includes(path)) return;
            const texts = (this.state.get(StateKeys.texts) as Language).getTexts(path.remove(/(\-|\/)/));
            this.cachedPages.set(path, new Page(texts, this.state));
            this.currentPage = this.cachedPages.get(path)!;
        }
    }

    // ------------------------------
    // Utilities.
    // ------------------------------
    /**
     * Searches for the given path in the tree of pages and returns the full path
     * if the path is found, otherwise returns null.
     * 
     * @param path - The path to be searched.
     * @param tree - The tree of pages to search in. Defaults to the tree of pages
     *              provided during construction.
     * @returns The full path if the path is found, otherwise null.
     */
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

    /**
     * Determines the appropriate page path based on the provided path.
     * 
     * @param path - The URL path to be evaluated.
     * @returns The first matching sub-path from the pages or the home page
     *          if no match is found or if the path equals the base path.
     */
    private findPage(path: string): string {
        // this.log('findPage', path);
        if (path === this.basePath) return this.homePage;
        const pathArr = path.slice(1).split('/');
        for (let i = 0; i < pathArr.length; i++) if (this.pages.has(`/${pathArr[i]}`)) return `/${pathArr[i]}`;
        return this.homePage;
    }

    /**
     * Pushes the given path to the browser's navigation history and updates the URL
     * in the browser's address bar. This method is called by the loadingProcess method
     * and should not be called directly.
     * @param path - The path to push to the navigation history.
     */
    private pushState(path: string): void {
        this.history.push(path);
        if (!location.pathname.includes(path))
            window.history.pushState(null, '', `${this.basePath === '/' ? '' : this.basePath}${path}`);
    }

    /**
     * Logs information about the navigation process for debugging purposes.
     * @param fnName The name of the function that calls this method.
     * @param path The path being navigated to.
     */
    private log(fnName: string, path: string): void {
        console.log('base path: ', this.basePath, `\n${fnName}: `, path, '\n-----------------------------');
    }
}