import { html, css } from "lit";
import common_styles from "../../utils/common-styles.js";
import { BaseEntity } from "./base-entity.js";
import { stoveCool, stoveHeat, stoveOff } from "../svg/stove.js";

// Constantes
import { STOVE_OFF, STOVE_HEAT, STOVE_COOL } from "./const.js";

var RENDER_ICONS = {};
RENDER_ICONS[STOVE_OFF] = stoveOff;
RENDER_ICONS[STOVE_HEAT] = stoveHeat;
RENDER_ICONS[STOVE_COOL] = stoveCool;

export class SciFiStoveInfo extends BaseEntity {
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

  constructor() {
    super();
    this.state = this.state ? this.state : STOVE_OFF;
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
