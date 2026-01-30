import './style/dist/style.css';
import './utils';

import { Navigation, setMetaTags, State, setOpenGraphTags, Preference, Language } from "@services";
import { Modal, Navbar } from "@shared";
import { StateKeys } from '@constants/stateKeys.constant';
import { appConfig } from 'app.config';
import type { ModalPayload } from '@shared/components/dialogs/modal/types';

class Main {
  // App element.
  app = document.getElementById('app') ?? this.createApp();
  // Services.
  appState: State = new State();
  navigation: Navigation = new Navigation(this.appState, this.app, appConfig.routes);

  // Elements.
  constructor() {
    const i18n = new Language();
    const pref = new Preference();
    this.appState.set(StateKeys.preferences, pref);
    this.appState.set(StateKeys.texts, i18n);
    pref.getLang().then(lang => i18n.importTexts(lang).then(_ => this.init()));
    setMetaTags(appConfig.meta);
    if (appConfig.OGCard) setOpenGraphTags(appConfig.OGCard);
  }

  /**
   * Creates an 'app' element if it doesn't exist.
   * @returns - 'app' element.
   */
  private createApp(): HTMLDivElement {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.replaceChildren(app);
    return app;
  }

  /**
   * Initializes the application.
   * Adds a Navbar to the application's 'app' element and subscribes to events.
   * @returns - Nothing.
   */
  private init(): void {
    document.body.append(new Navbar(this.navigation.tree, this.appState));
    this.navigation.firstLoad();
    this.subscribes();
  }

  /**
   * Subscribes to events.
   * Creates a modal if StateKeys.openModal is emitted, and removes it if StateKeys.closeModal is emitted.
   * @returns - Nothing.
   */
  private subscribes(): void {
    const modals: { [key: string]: Modal } = {};
    // Modals.
    this.appState.subscribe<ModalPayload>(StateKeys.openModal, ({ key, content }) => {
      if (modals[key]) return;
      this.appState.set(`${key}:${StateKeys.checkModal}`, true);
      modals[key] = new Modal(this.app.append.bind(this.app), content, () => (delete modals[key], this.appState.set(`${key}:${StateKeys.checkModal}`, false)));
    });
  }
}

new Main();
