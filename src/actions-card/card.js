import { html } from "lit";
import { BaseElement } from "../utils/base-element.js";


import { VERSION } from "./config.js";
import { PACKAGE } from "./const.js";

// Custom CSS
import common_styles from "../utils/common-styles.js";
import styles from "./styles.js";

export class ActionsCard extends BaseElement {
  static get styles() {
    return [common_styles, styles];
  }

  static get properties() {
    return {};
  }

  // card configuration
  static getConfigElement() {
    return document.createElement(PACKAGE + "-editor");
  }

  constructor() {
    // TODO validate config format
    super(VERSION, PACKAGE);
  }

  setConfig(config) {
    // Validate config entries
    super.setConfig(config);
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    return html`
      <div class="row">
        <span class="bar"></span>
        <span class="diag-left"></span>
        ${this.__renderdActionsRow()}
        <span class="diag-right"></span>
        <span class="bar"></span>
      </div>
    `;
  }

  __renderdActionsRow(){
    return html`
      <div class="actions-badge-content row column-gap">
        ${this._config.actions.map((action) => {
          return this.__renderActionButton(action);
        })}
      </div>
    `;
  }

  __renderActionButton(action){
    return html`
    <sci-fi-card class="action-card" content-display="column" align-item="center" no-padding height="100%">
      <div class="action-state">${action.showState ? "State" : ""}</div>
      <div class="action-icon">${action.icon}</div>
      <div class="action-name">${action.name}</div>
    </sci-fi-card>
    `;
  }

}
