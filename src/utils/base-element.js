import { LitElement, html } from "lit";

// Custom CSS
import styles from "./common-styles.js";

export class BaseElement extends LitElement {
  static get styles() {
    return [styles];
  }

  /* Property */
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

  constructor(version, packageName) {
    super();
    if (version == "DEV") {
      import("./../" + packageName + "/config.js").then(({ hass, config }) => {
        this._hass = hass;
        this.setConfig(config);
        this.requestUpdate();
      });
    }
    console.info(
      `%c${packageName} v${version}`,
      "color: rgb(105, 211, 251); font-weight: bold; background: black",
    );
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