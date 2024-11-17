import { LitElement, html } from "lit";

import "./../utils/sci-fi-card.js";
import { renderSvgIcon } from "./../utils/icon-svg.js";

import { VERSION } from "./config.js";
import { mdiHomeOutline, mdiHomeOffOutline } from "@mdi/js";

// Custom CSS
import common_styles from "./../common-styles.js";
import styles from "./styles.js";

// Constant
const STATE_HOME = "home";

export class PeopleCard extends LitElement {
  static get styles() {
    return [common_styles, styles];
  }

  constructor() {
    super();
    if (VERSION == "DEV") {
      import("./config.js").then(({ hass, config }) => {
        this.hass = hass;
        this.setConfig(config);
        this.requestUpdate();
      });
    }
    console.info(
      `%cPEOPLE-CARD Version: ${VERSION}`,
      "color: rgb(105, 211, 251); font-weight: bold; background: black",
    );
  }

  setConfig(config) {
    if (!config.people) {
      throw new Error("You need to define a people entity list");
    }
    this.config = config;
  }

  render() {
    if (this.hass == undefined) return html``;
    return html`
      <sci-fi-card content-display="row" gap>
        ${this.config.people.map((personEntity) => {
          return this.__renderPerson(personEntity);
        })}
      </sci-fi-card>
    `;
  }

  __renderPerson(entityName) {
    const entity = this.hass.states[entityName];
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

window.customElements.define("people-card", PeopleCard);
