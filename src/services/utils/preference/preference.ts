import { Storage } from "@services/state";
import { Device } from "../device/device";
import { FontSize, Theme, TimeFormat, DateFormat } from "./types";
import { theme } from './theme';

export class Preference {
    private storage = new Storage();
    private storageKey = Preference.name.toLowerCase();
    private initialFontSize: number;
    constructor() {
        this.initialFontSize = +getComputedStyle(document.documentElement).getPropertyValue('--fontSize').trim().replace('px', '');
    }
    // General
    // // Theme
    async getTheme(): Promise<Theme> {
        return await this.storage.getItem(`${this.storageKey}:theme`) ?? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    setTheme(theme: Theme): void {
        this.storage.setItem(`${this.storageKey}:theme`, theme);
        this.executeTheme();
    }
    async executeTheme(): Promise<void> {
        let preferredTheme = await this.getTheme();
        if (preferredTheme === 'auto') preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        for (const [variable, value] of Object.values(theme[preferredTheme]))
            if (value.length) document.documentElement.style.setProperty(`--${variable}`, value);
    }

    // // Language
    async getLang(): Promise<string> {
        return await this.storage.getItem(`${this.storageKey}:lang`) ?? Device.lang;
    }
    setLang(lang: string): void {
        this.storage.setItem(`${this.storageKey}:lang`, lang);
    }

    // // Font Size
    async getFontSize(): Promise<FontSize> {
        return await this.storage.getItem(`${this.storageKey}:size`) ?? 'medium';
    }
    setFontSize(size: FontSize): void {
        this.storage.setItem(`${this.storageKey}:size`, size);
        this.executeFontSize();
    }
    async executeFontSize(): Promise<void> {
        const size = await this.getFontSize();
        let newFontSize = this.initialFontSize;
        if (size === 'large') newFontSize *= 1.2;
        if (size === 'small') newFontSize /= 1.2;
        document.documentElement.style.setProperty(`--fontSize`, `${newFontSize}px`);
    }

    // // Date Format
    async getDateFormat(): Promise<DateFormat> {
        return await this.storage.getItem(`${this.storageKey}:date`) ?? 'MM/DD/YYYY';
    }
    setDateFormat(format: DateFormat): void {
        this.storage.setItem(`${this.storageKey}:date`, format);
    }

    // // Time Format
    async getTimeFormat(): Promise<TimeFormat> {
        return await this.storage.getItem(`${this.storageKey}:time`) ?? 24;
    }
    setTimeFormat(format: TimeFormat): void {
        this.storage.setItem(`${this.storageKey}:time`, format);
    }

    // Accessibility
    // // Contrast
    highContrast(): void {
        document.body.classList.add('high-contrast');
    }
    regularContrast(): void {
        document.body.classList.remove('high-contrast');
    }
    // // Reduce Motion
    reduceMotion(): void {
        document.body.classList.add('reduce-motion');
    }
    regularMotion(): void {
        document.body.classList.remove('reduce-motion');
    }
}