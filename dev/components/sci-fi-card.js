import {LitElement, html, css} from 'lit';

import styles from '../css/custom.css' with {type: 'css'};

const VERSION = 'DEV';
console.info(
  `%cSCI-FI-CARD Version: ${VERSION}`,
  'color: rgb(105, 211, 251); font-weight: bold; background: black',
);

export class SciFiCard extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        --card-border-width: 1px;
        width: fit-content;
      }
      .card,
      .card-alert {
        border-style: solid;
        border-width: var(--card-border-width) 0;
        border-color: var(--color-darkblue-opacity);
        position: relative;
        background: var(--color-lightblue-opacity);
        box-shadow: 0 0 5px 1px var(--color-darkblue);
        padding: 5px;
      }
      .card-alert {
        border-color: var(--color-darkyellow-opacity);
        background: var(--color-lightyellow-opacity);
        box-shadow: 0 0 5px 1px var(--color-darkyellow);
        text-shadow: 0px 0px 5px var(--color-darkyellow);
        color: var(--color-darkyellow);
        padding: 0;
      }
      .card-content {
        padding: 5px;
      }
    `,
  ];

  static get properties() {
    return {
      type: {type: String},
    };
  }

  constructor() {
    super();
    this.type = this.type ? this.type : '';
  }

  render() {
    const cls = this.type && this.type != 'alert' ? '' : '-alert';
    return html`
      <div class="column card${cls}">
        <span class="corner-border-top${cls}"></span>
        <div class="card-content column gap">
          <slot></slot>
        </div>
        <span class="corner-border-bottom${cls}"></span>
      </div>
    `;
  }
}

window.customElements.define('sci-fi-card', SciFiCard);
