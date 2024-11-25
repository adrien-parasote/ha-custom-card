import { html, css } from "lit";
import { renderSvgIcon } from "../icon-svg.js";
import { mdiLightbulbGroup } from "@mdi/js";
import common_styles from "../../utils/common-styles.js";

import { BaseEntity } from "./base-entity.js";

// Constantes
import { STATE_ON, STATE_OFF } from "./const.js";

var RENDER_ICONS = {};
RENDER_ICONS[STATE_ON] = mdiLightbulbGroup;
RENDER_ICONS[STATE_OFF] = mdiLightbulbGroup;

export class SciFiLight extends BaseEntity {
  static get styles() {
    return [
      common_styles,
      css`
        .content {
          align-items: center;
        }
        .title {
          font-size: var(--font-size-small);
        }
        .icon-container {
          width: 23px;
          height: 100%;
          align-content: center;
          position: relative;
        }
        .icon {
          fill: var(--secondary-color);
        }
        .orange {
          color: var(--color-active-icon);
          text-shadow: 0px 0px 5px var(--color-active-icon);
        }
        .orange > .icon {
          fill: var(--color-active-icon);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.state = this.state ? this.state : STATE_OFF;
  }

  render() {
    return html`
      <div class="column content" no-padding>
        <div class="icon-container ${this.__getLabelColor()}">
          ${renderSvgIcon(RENDER_ICONS[this.state])}
        </div>
        <div class="title ${this.__getLabelColor()}">${this.name}</div>
      </div>
    `;
  }

  __getLabelColor() {
    return this.state == STATE_OFF ? "blue" : "orange";
  }
}

window.customElements.get("sci-fi-light-info") ||
  window.customElements.define("sci-fi-light-info", SciFiLight);
