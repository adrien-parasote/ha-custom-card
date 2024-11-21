import { LitElement, html } from "lit";
import styles from "./common-styles.js";
import editorStyles from "./editor-styles.js";

export class BaseEditor extends LitElement {
  static get styles() {
    return [styles, editorStyles];
  }

  static get properties() {
    return {
      _config: { type: Object },
    };
  }

  setConfig(config) {
    this._config = config;
  }

  render() {
    return html`TO DO`;
  }
}
