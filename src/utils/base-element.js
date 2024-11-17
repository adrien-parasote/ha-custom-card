import { LitElement, html } from "lit";

// Custom CSS
import styles from "../common-styles.js";

export class BaseElement extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {};
  }

  constructor(version, packageName) {
    super();
    if (version == "DEV") {
      import("./../" + packageName + "/config.js").then(({ hass, config }) => {
        this.hass = hass;
        this.setConfig(config);
        this.requestUpdate();
      });
    }
    console.info(
      `%c${this.constructor.name} Version: ${version}`,
      "color: rgb(105, 211, 251); font-weight: bold; background: black",
    );
  }

  setConfig(config) {
    this.config = config;
  }

  render() {
    return html`TO DO`;
  }
}
