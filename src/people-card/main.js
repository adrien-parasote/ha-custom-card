import { LitElement, html, css } from "lit";

import './../utils/base-card.js'
import { renderSvgIcon } from "./../utils/icon-svg.js"

import { VERSION } from "./config.js";
import { mdiHomeOutline, mdiHomeOffOutline } from "@mdi/js";

// Custom CSS
import styles from "./../common-styles.js";

// Constant
const STATE_HOME = "home";

export class PeopleCard extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        :host {
          --state-container-icon-size: 20px;
          --state-icon-size: 15px;

          min-width: calc(var(--state-container-icon-size) + 15px);
        }
        .column {
          align-items: center;
        }
        .column-gap {
          column-gap: calc(var(--gap-size) * 2);
        }
        .avatar {
          border: 1px solid var(--secondary-color);
          box-shadow: 0 0 5px 1px var(--secondary-color);
          border-radius: 50%;
          height: var(--icon-size);
          width: var(--icon-size);
          position: relative;
        }
        img {
          width: auto;
          height: 100%;
          border-radius: 50%;
        }
        .icon-container {
          background-color: var(--secondary-color-opacity);
          border-radius: 50%;
          width: var(--state-container-icon-size);
          height: var(--state-container-icon-size);
          position: absolute;
          top: -5px;
          right: -10px;
          text-align: center;
          align-content: end;
        }
        .icon {
          fill: var(--primary-color);
          width: var(--state-icon-size);
          height: var(--state-icon-size);
        }
        .avatar-info {
          align-self: center;
          margin: auto;
          font-weight: bold;
          padding-top: 5px;
        }
      `,
    ];
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

  getCardSize() {
    return 1;
  }

  render() {
    if (this.hass == undefined) return html``;
    return html`
      <base-card content-display="row" gap>
        ${this.config.people.map((personEntity) => {
          return this.__renderPerson(personEntity);
        })}
      </base-card>
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
                entity.state == STATE_HOME
                  ? mdiHomeOutline
                  : mdiHomeOffOutline
                )
              }
          </div>
        </div>
        <div class="column avatar-info">${entity.attributes.friendly_name}</div>
      </div>
    `;
  }
}

window.customElements.define("people-card", PeopleCard);
