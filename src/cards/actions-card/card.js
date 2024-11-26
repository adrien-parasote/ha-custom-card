import { html } from "lit";

import { BaseElement } from "../../utils/base-element.js";
import common_styles from "../../utils/common-styles.js";
import { ActionsCardEditor } from "./editor.js";
import "./../../helpers/toast/toast.js";

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
    return { actions: [] };
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
          <div>ICON</div>
          <div>${action.name}</div>
        </div>
        <div class="helper"></div>
      </div>
    `;
  }

  _tapped(e, action) {
    e.preventDefault();
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
