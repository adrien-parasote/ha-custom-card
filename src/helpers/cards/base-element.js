import { LitElement, html } from "lit";
import { DEV } from "../../const.js";
import styles from "../../helpers/styles/common-styles.js";

export class BaseElement extends LitElement {
  static get styles() {
    return [styles];
  }

  _hass; // private

  static get properties() {
    return {
      _config: { type: Object },
    };
  }

  set hass(hass) {
    this._hass = hass;
  }

  static getStubConfig() {
    return {};
  }

  constructor(module) {
    super();
    if (DEV) {
      import("../../utils/config.js").then(({ hass, config }) => {
        this._hass = hass;
        this.setConfig(config[module]);
        this.requestUpdate();
      });
    }
  }

  setConfig(config) {
    this._config = config;
    // call set hass() to immediately adjust to a changed entity
    // while editing the entity in the card editor
    if (this._hass) {
      this.hass = this._hass;
    }
  }

  render() {
    return html`TO DO`;
  }
}

export class BaseEditor extends LitElement {
  static get styles() {
    return [styles];
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
