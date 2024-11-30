import { html } from "lit";

import { BaseElement } from "../../helpers/cards/base-element.js";
import common_styles from "../../helpers/styles/common-styles.js";
import { InfoCardEditor } from "./editor.js";

import { PACKAGE } from "./const.js";
import styles from "./styles.js";

import "./../../helpers/entities/stove.js";
import "./../../helpers/entities/error.js";
import "./../../helpers/entities/vacuum.js";
import "./../../helpers/entities/light.js";
import "./editor.js";

export class InfoCard extends BaseElement {
  /**** DEFINE CARD ELEMENTS ****/
  static get styles() {
    return [common_styles, styles];
  }
  constructor() {
    super(PACKAGE);
  }
  setConfig(config) {
    if (!config.info) {
      throw new Error("You need to define an info entity list entry");
    }
    config.info.map((info) => {
      if (!info.entity) {
        throw new Error("You need to define a entity to show");
      }
      if (!info.type) {
        info.type = info.entity.split(".")[0];
        console.info(
          "[sci-fi-info-card] No entity type selected, use default : " +
            info.type,
        );
      }
    });
    super.setConfig(config);
  }

  /**** DEFINE CARD EDITOR ELEMENTS ****/
  static getConfigElement() {
    return document.createElement(PACKAGE + "-editor");
  }
  static getStubConfig() {
    return { info: [{ entity: "light.entity", type: "light" }] };
  }

  /**** RENDER CARD ****/
  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    return html`
      <sci-fi-card gap>
        <div class="row column-gap">
          ${this._config.info.map((info) => {
            return this.__renderInfoRow(info);
          })}
        </div>
      </sci-fi-card>
    `;
  }

  __renderError(info) {
    console.info(
      `[sci-fi-info-card] Entity ${info.entity} with type ${info.type} cannot be render.`,
    );
    return html`<sci-fi-error-info></sci-fi-error-info>`;
  }

  __renderInfoRow(info) {
    const entity = this._hass.states[info.entity];
    var render = html``;
    if (!entity) return this.__renderError(info);
    switch (info.type) {
      case "stove":
        render = html`
          <sci-fi-stove-info
            state="${entity.state}"
            entity-id="${info.entity}"
            name="${entity.attributes.friendly_name}"
          >
          </sci-fi-stove-info>
        `;
        break;
      case "light":
        render = html`
          <sci-fi-light-info
            state="${entity.state}"
            entity-id="${info.entity}"
            name="${entity.attributes.friendly_name}"
          >
          </sci-fi-light-info>
        `;
        break;
      case "vacuum":
        render = html`
          <sci-fi-vacuum-info
            state="${entity.state}"
            entity-id="${info.entity}"
            name="${entity.attributes.friendly_name}"
          >
          </sci-fi-vacuum-info>
        `;
        break;
      default:
        render = this.__renderError(info);
    }
    return render;
  }
}

window.customElements.get(PACKAGE) ||
  window.customElements.define(PACKAGE, InfoCard);
window.customElements.get(PACKAGE + "-editor") ||
  window.customElements.define(PACKAGE + "-editor", InfoCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: PACKAGE,
  name: "Render sci-fi info card",
  description: "Render sci-fi info",
});
