import { html, css } from "lit";
import common_styles from "../../utils/common-styles.js";
import { renderSvgIcon } from "../icon-svg.js";
import { vacuumMoving } from "../svg/vacuum.js";
import {
  mdiRobotVacuumVariantAlert,
  mdiRobotVacuumVariant,
  mdiBroom,
  mdiKeyboardReturn,
  mdiSleep,
  mdiFlash,
} from "@mdi/js";
import { BaseEntity } from "./base-entity.js";

// Constantes
import {
  VACUUM_CLEANING,
  VACUUM_DOCKED,
  VACUUM_RETURNING,
  VACUUM_ERROR,
  VACUUM_IDLE,
} from "./const.js";

var RENDER_ICONS = {};
RENDER_ICONS[VACUUM_CLEANING] = vacuumMoving;
RENDER_ICONS[VACUUM_DOCKED] = mdiRobotVacuumVariant;
RENDER_ICONS[VACUUM_RETURNING] = vacuumMoving;
RENDER_ICONS[VACUUM_ERROR] = mdiRobotVacuumVariantAlert;
RENDER_ICONS[VACUUM_IDLE] = mdiRobotVacuumVariant;

export class SciFiVacuumInfo extends BaseEntity {
  static get styles() {
    return [
      common_styles,
      css`
        :host {
          height: 100%;
        }
        svg {
          fill: var(--secondary-color);
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
        .orange {
          color: var(--color-active-icon);
          text-shadow: 0px 0px 5px var(--color-active-icon);
        }
        .red {
          color: var(--color-error-icon);
          text-shadow: 0px 0px 5px var(--color-error-icon);
        }
        .red > .icon {
          fill: var(--color-error-icon);
          stroke: transparent;
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

  constructor() {
    super();
    this.state =
      this.state && Object.keys(RENDER_ICONS).includes(this.state)
        ? this.state
        : VACUUM_IDLE;
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
        if (this.state == VACUUM_DOCKED) {
          return html`<div class="icon-container">
            ${renderSvgIcon(RENDER_ICONS[this.state])}
            <div class="state-icon">${renderSvgIcon(mdiFlash)}</div>
          </div>`;
        } else {
          return html`<div class="icon-container ${this.__getLabelColor()}">
            ${renderSvgIcon(RENDER_ICONS[this.state])}
          </div>`;
        }
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
