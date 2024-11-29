import { html } from "lit";

import { BaseElement } from "../../helpers/cards/base-element.js";
import common_styles from "../../helpers/styles/common-styles.js";
import { getIcon } from "../../helpers/styles/icon-svg.js";
import { ActionsCardEditor } from "./editor.js";
import "../../helpers/cards/toast-card.js";

import { PACKAGE } from "./const.js";
import styles from "./styles.js";

import "./editor.js";

export class ActionsCard extends BaseElement {
  /**** DEFINE CARD ELEMENTS ****/
  static get styles() {
    return [common_styles, styles];
  }
  constructor() {
    super(PACKAGE);
  }
  setConfig(config) {
    if (!config.actions) {
      throw new Error("You need to define an info entity list entry");
    }
    super.setConfig(config);
  }

  /**** DEFINE CARD EDITOR ELEMENTS ****/
  static getConfigElement() {
    return document.createElement(PACKAGE + "-editor");
  }
  static getStubConfig() {
    return {
      actions: [
        {
          entity: "",
          name: "",
          icon: "mdiAlienOutline",
          service: "",
          service_data: {},
        },
      ],
    };
  }

  /**** RENDER CARD ****/
  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    return html`
      <div class="row column-gap">
        ${this._config.actions.map((elt) => {
          return this.__renderRow(elt);
        })}
      </div>
      <toast-card></toast-card>
    `;
  }

  __renderRow(action) {
    return html`
      <div class="action-container" @click="${(e) => this._tapped(e, action)}">
        <div class="row column-gap">
          ${action.icon ? this._renderIcon(action.icon) : ""}
          <div>${action.name}</div>
        </div>
        <div class="helper"></div>
      </div>
    `;
  }

  _renderIcon(icon) {
    return html`<div class="icon-container">${getIcon(icon)}</div>`;
  }

  _tapped(e, action) {
    e.preventDefault();
    e.stopPropagation();
    const toast = this.shadowRoot.querySelector("toast-card");
    try {
      toast.show("Start " + action.name);
      const services = action.service.split(".");
      this._hass.callService(services[0], services[1], action.service_data);
    } catch (error) {
      toast.show("Error during action call : " + error);
    }
  }
}

window.customElements.get(PACKAGE) ||
  window.customElements.define(PACKAGE, ActionsCard);
window.customElements.get(PACKAGE + "-editor") ||
  window.customElements.define(PACKAGE + "-editor", ActionsCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: PACKAGE,
  name: "Render sci-fi actions card",
  description: "Render sci-fi actions",
});
