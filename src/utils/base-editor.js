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

  _hass; // private

  set hass(hass) {
    this._hass = hass;
  }

  setConfig(config) {
    this._config = config;
  }

  render() {
    return html`TO DO`;
  }

  getNewConfig() {
    return JSON.parse(JSON.stringify(this._config));
  }

  dispatchChange(newConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }
}