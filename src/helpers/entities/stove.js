import {css, html} from 'lit';

import common_styles from '../styles/common-styles.js';
import {getIcon} from '../styles/icon-svg.js';
import {BaseEntity} from './base-entity.js';
// Constantes
import {STOVE_COOL, STOVE_HEAT, STOVE_OFF} from './const.js';

var RENDER_ICONS = {};
RENDER_ICONS[STOVE_OFF] = 'stoveOff';
RENDER_ICONS[STOVE_HEAT] = 'stoveHeat';
RENDER_ICONS[STOVE_COOL] = 'stoveCool';

export class SciFiStoveInfo extends BaseEntity {
  static get styles() {
    return [
      common_styles,
      css`
        .content {
          align-items: center;
        }
        .title {
          font-size: var(--font-size-small);
          margin-top: 2px;
        }
        .orange {
          color: var(--color-active-icon);
          text-shadow: 0px 0px 5px var(--color-active-icon);
        }
        .icon-container {
          width: var(--icon-size-normal);
          height: var(--icon-size-normal);
          align-content: center;
          position: relative;
        }
        .icon {
          fill: var(--secondary-color);
        }
        .orange > .icon {
          fill: var(--color-active-icon);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.state =
      this.state && Object.keys(RENDER_ICONS).includes(this.state)
        ? this.state
        : STOVE_OFF;
  }

  render() {
    return html`
      <div class="column content" no-padding>
        <div class="icon-container ${this.__getLabelColor()}">
          ${getIcon(RENDER_ICONS[this.state])}
        </div>
        <div class="title ${this.__getLabelColor()}">${this.name}</div>
      </div>
    `;
  }

  __getLabelColor() {
    return this.state == STOVE_OFF ? 'blue' : 'orange';
  }
}

window.customElements.get('sci-fi-stove-info') ||
  window.customElements.define('sci-fi-stove-info', SciFiStoveInfo);
