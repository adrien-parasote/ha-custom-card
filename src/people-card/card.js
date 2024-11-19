import { html } from "lit";
import { BaseElement } from "./../utils/base-element.js";
import { renderSvgIcon } from "./../utils/icon-svg.js";

import { VERSION } from "./config.js";
import { mdiHomeOutline, mdiHomeOffOutline } from "@mdi/js";

// Custom CSS
import common_styles from "./../utils/common-styles.js";
import styles from "./styles.js";

// Constants
import { STATE_HOME, PACKAGE } from "./const.js";

export class PeopleCard extends BaseElement {
  static get styles() {
    return [common_styles, styles];
  }

  constructor() {
    super(VERSION, PACKAGE);
  }

  setConfig(config) {
    if (!config.people) {
      throw new Error("You need to define a people entity list");
    }
    super.setConfig(config);
  }

  // card configuration
  static getConfigElement() {
    return document.createElement(PACKAGE + "-editor");
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    return html`
      <sci-fi-card content-display="row" gap>
        ${this._config.people.map((personEntity) => {
          return this.__renderPerson(personEntity);
        })}
      </sci-fi-card>
    `;
  }

  __renderPerson(entityName) {
    const entity = this._hass.states[entityName];
    return html`
      <div class="column">
        <div class="avatar">
          <img src="${entity.attributes.entity_picture}" />
          <div class="icon-container">
            ${renderSvgIcon(
              entity.state == STATE_HOME ? mdiHomeOutline : mdiHomeOffOutline,
            )}
          </div>
        </div>
        <div class="column avatar-info">${entity.attributes.friendly_name}</div>
      </div>
    `;
  }
}
