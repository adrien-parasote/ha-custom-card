import {LitElement, css, html} from 'lit';

import common_styles from '../styles/common-styles.js';
import {getIcon} from '../styles/icon-svg.js';

export class SciFiErrorInfo extends LitElement {
  static get styles() {
    return [
      common_styles,
      css`
        :host {
          height: 100%;
        }
        .content {
          align-items: center;
          height: 100%;
        }
        .title {
          font-size: var(--font-size-small);
          color: var(--color-error-icon);
          text-shadow: 0px 0px 5px var(--color-error-icon);
          margin-top: 2px;
        }
        .icon-container {
          width: var(--icon-size-normal);
          height: var(--icon-size-normal);
          align-content: center;
        }
        .icon {
          fill: var(--color-error-icon);
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="column content" no-padding>
        <div class="icon-container">${getIcon('mdiAlertOutline')}</div>
        <div class="title">Not found</div>
      </div>
    `;
  }
}

window.customElements.get('sci-fi-error-info') ||
  window.customElements.define('sci-fi-error-info', SciFiErrorInfo);
