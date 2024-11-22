import { html, LitElement, css } from "lit";
import common_styles from "../../utils/common-styles.js";
import { renderSvgIcon } from "../icon-svg.js";
import { vacuumMoving } from "../svg/vacuum.js";
import {
  mdiRobotVacuumVariantAlert,
  mdiRobotVacuumVariant,
  mdiBroom,
  mdiKeyboardReturn,
  mdiSleep,
} from "@mdi/js";

// Constantes
const VACUUM_CLEANING = "cleaning";
const VACUUM_DOCKED = "docked";
const VACUUM_RETURNING = "returning";
const VACUUM_ERROR = "error";
const VACUUM_IDLE = "idle";

var RENDER_ICONS = {};
RENDER_ICONS[VACUUM_CLEANING] = vacuumMoving;
RENDER_ICONS[VACUUM_DOCKED] = mdiRobotVacuumVariant;
RENDER_ICONS[VACUUM_RETURNING] = vacuumMoving;
RENDER_ICONS[VACUUM_ERROR] = mdiRobotVacuumVariantAlert;
RENDER_ICONS[VACUUM_IDLE] = mdiRobotVacuumVariant;

export class SciFiVacuumInfo extends LitElement {
  static get styles() {
    return [
      common_styles,
      css`
        :host {
          height: 100%;
        }
        svg {
          stroke: var(--secondary-color);
        }
        .svg-container {
          width: var(--icon-size-normal);
          height: var(--icon-size-normal);
          position: relative;
        }
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
        }
        .orange {
          color: var(--color-active-icon);
          text-shadow: 0px 0px 5px var(--color-active-icon);
        }
        .red {
          color: var(--color-error-icon);
          text-shadow: 0px 0px 5px var(--color-error-icon);
        }
        .red > .icon {
          stroke: var(--color-error-icon);
        }
        .state-icon {
          width: var(--icon-size-xsmall);
          height: var(--icon-size-xsmall);
          position: absolute;
          top: -7px;
          right: -7px;
          border-radius: 50%;
          background-color: var(--secondary-color-opacity);
          padding: 2px;
        }
        .state-icon svg {
          fill: black;
          stroke: var(--secondary-color);
        }
        .state-icon-orange {
          background-color: var(--color-active-icon-opacity);
        }
        .state-icon-orange svg {
          stroke: var(--color-active-icon);
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
    this.state = this.state ? this.state : VACUUM_IDLE;
    this.name = this.name ? this.name : null;
  }

  render() {
    return html`
      <div class="column content" no-padding>
        ${this.__getIcon()}
        <div class="title ${this.__getLabelColor()}">${this.name}</div>
      </div>
    `;
  }

  __getIcon() {
    if (this.state == VACUUM_CLEANING || this.state == VACUUM_RETURNING) {
      return html`<div class="svg-container">
        ${RENDER_ICONS[this.state]}
        <div class="state-icon state-icon-orange">
          ${renderSvgIcon(
            this.state == VACUUM_CLEANING ? mdiBroom : mdiKeyboardReturn,
          )}
        </div>
      </div>`;
    } else {
      if (this.state == VACUUM_IDLE) {
        return html`<div class="icon-container">
          ${renderSvgIcon(RENDER_ICONS[this.state])}
          <div class="state-icon">${renderSvgIcon(mdiSleep)}</div>
        </div>`;
      } else {
        return html`<div class="icon-container ${this.__getLabelColor()}">
          ${renderSvgIcon(RENDER_ICONS[this.state])}
        </div>`;
      }
    }
  }
  __getLabelColor() {
    var color = "";
    switch (this.state) {
      case VACUUM_CLEANING:
        color = "orange";
        break;
      case VACUUM_RETURNING:
        color = "orange";
        break;
      case VACUUM_ERROR:
        color = "red";
        break;
      default:
        color = "";
    }
    return color;
  }
}

window.customElements.get("sci-fi-vacuum-info") ||
  window.customElements.define("sci-fi-vacuum-info", SciFiVacuumInfo);
