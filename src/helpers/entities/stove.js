import { html, LitElement, css } from "lit";
import common_styles from "../../utils/common-styles.js";

import { stoveCool, stoveHeat, stoveOff } from "../svg/stove.js";
// Constantes
const STOVE_OFF = "off";
const STOVE_HEAT = "heat";
const STOVE_COOL = "cool";

var RENDER_ICONS = {};
RENDER_ICONS[STOVE_OFF] = stoveOff;
RENDER_ICONS[STOVE_HEAT] = stoveHeat;
RENDER_ICONS[STOVE_COOL] = stoveCool;

export class SciFiStoveInfo extends LitElement {
  static get styles() {
    return [
      common_styles,
      css`
        svg {
          stroke: var(--secondary-color);
        }
        .svg-container {
          width: var(--icon-size-normal);
          height: var(--icon-size-normal);
        }
        .content {
          align-items: center;
        }
        .title {
          font-size: var(--font-size-small);
        }
        .orange {
          color: var(--color-active-icon);
          text-shadow: 0px 0px 5px var(--color-active-icon);
        }
      `,
    ];
  }

  static get properties() {
    return {
      entityId: { type: String, attribute: "entity-id" },
      state: { type: String },
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.entityId = this.entityId ? this.entityId : null;
    this.state = this.state ? this.state : STOVE_OFF;
    this.name = this.name ? this.name : null;
  }

  render() {
    return html`
      <div class="column content" no-padding>
        <div class="svg-container">${RENDER_ICONS[this.state]}</div>
        <div class="title ${this.__getLabelColor()}">${this.name}</div>
      </div>
    `;
  }

  __getLabelColor() {
    return this.state == STOVE_OFF ? "blue" : "orange";
  }
}

window.customElements.get("sci-fi-stove-info") ||
  window.customElements.define("sci-fi-stove-info", SciFiStoveInfo);
