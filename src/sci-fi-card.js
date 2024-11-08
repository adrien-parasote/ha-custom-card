import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom CSS
import styles from "./common-styles.js";

// Version
import { SCI_FI_CARD_VERSION } from "./config.js";
console.info(
  `%cSCI-FI-CARD Version: ${SCI_FI_CARD_VERSION}`,
  "color: rgb(105, 211, 251); font-weight: bold; background: black",
);

export class SciFiCard extends LitElement {
  static styles = [
    styles,
    css`
      :host {        
        width: fit-content;
      }
      .card,
      .card-alert {
        position: relative;
        padding: 5px;
      }
      .card-alert {
        color: var(--color-darkyellow);
        padding: 0;
      }
      .card-content {
        padding: 5px;
      }
      .corner-border-top:before,
      .corner-border-top:after,
      .corner-border-bottom:before,
      .corner-border-bottom:after {
        border-color: var(--color-lightblue);
      }
    `,
  ];

  static get properties() {
    return {
      type: { type: String },
    };
  }

  constructor() {
    super();
    this.type = this.type ? this.type : "";
  }

  render() {
    const cls = this.type && this.type != "alert" ? "" : "-alert";
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

window.customElements.define("sci-fi-card", SciFiCard);
