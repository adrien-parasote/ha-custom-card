import { html } from "lit";
import { BaseElement } from "../utils/base-element.js";
import { renderSvgIcon } from "../utils/icon-svg.js";
import { mdiHomeOutline, mdiHomeOffOutline } from "@mdi/js";

import { VERSION } from "./config.js";
import { PACKAGE, STATE_HOME } from "./const.js";

// Custom CSS
import common_styles from "../utils/common-styles.js";
import styles from "./styles.js";

export class PersonBadge extends BaseElement {
  static get styles() {
    return [common_styles, styles];
  }

  static get properties() {
    return {
      _config: { type: Object },
      _entityId: { type: String },
      _entity: { type: Object },
      _state: { type: String },
      _picture: { type: String },
    };
  }

  // card configuration
  static getConfigElement() {
    return document.createElement(PACKAGE + "-editor");
  }

  static getStubConfig() {
    return { entity: "person.entity" };
  }

  constructor() {
    super(VERSION, PACKAGE);
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this._entityId = config.entity;
    if (!this._entityId.startsWith("person.")) {
      throw new Error("You need to define a person entity");
    }
    super.setConfig(config);
  }

  set hass(hass) {
    this._hass = hass;
    this._entity = hass.states[this._entityId];
    if (this._entity) {
      this._state = this._entity.state;
      this._picture = this._entity.attributes.entity_picture;
    }
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    return html`
      <div class="avatar">
        <img src="${this._picture ? this._picture : ""}" />
        <div class="icon-container">
          ${renderSvgIcon(
            this._state == STATE_HOME ? mdiHomeOutline : mdiHomeOffOutline,
          )}
        </div>
      </div>
    `;
  }
}
