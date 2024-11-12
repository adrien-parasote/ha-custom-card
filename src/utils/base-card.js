import { LitElement, html, css } from "lit";

// Custom CSS
import styles from "../common-styles.js";

export class BaseCard extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        .card {
          position: relative;
          padding: 5px;
        }
        .card-content {
          padding: 10px;
        }
        .corner-border-top:before,
        .corner-border-top:after,
        .corner-border-bottom:before,
        .corner-border-bottom:after {
          border-style: solid;
          border-width: 0;
          border-color: var(--secondary-color);
          content: "";
          height: 5px;
          position: absolute;
          width: 5px;
        }
        .corner-border-top::before {
          border-left-width: var(--card-border-width);
          border-top-width: var(--card-border-width);
          left: 0;
          top: -1px;
        }
        .corner-border-top::after {
          border-right-width: var(--card-border-width);
          border-top-width: var(--card-border-width);
          right: 0;
          top: -1px;
        }
        .corner-border-bottom::before {
          border-bottom-width: var(--card-border-width);
          border-left-width: var(--card-border-width);
          bottom: -1px;
          left: 0;
        }
        .corner-border-bottom::after {
          border-bottom-width: var(--card-border-width);
          border-right-width: var(--card-border-width);
          bottom: -1px;
          right: 0;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="column card">
        <span class="corner-border-top"></span>
        <div class="card-content row column-gap">
          <slot></slot>
        </div>
        <span class="corner-border-bottom"></span>
      </div>
    `;
  }
}

window.customElements.define("base-card", BaseCard);
