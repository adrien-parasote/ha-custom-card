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
          padding: 5px;
        }
        .card-wrap {
          padding: 5px;
        }
        .corner-border-top:before,
        .corner-border-top:after,
        .corner-border-bottom:before,
        .corner-border-bottom:after {
          border-style: solid;
          border-width: 0;
          border-color: var(--secondary-color);
          content: "";
          height: 10px;
          position: absolute;
          width: 10px;
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

  static get properties() {
    return {
      contentDisplay: { type: String, attribute: "content-display" },
      gap: { type: Boolean },
      wrap: { type: Boolean },
      width: { type: String },
      height: { type: String },
      alignItem: { type: String, attribute: "align-item" },
    };
  }

  constructor() {
    super();
    this.contentDisplay =
      this.contentDisplay && ["row", "column"].includes(this.contentDisplay)
        ? this.contentDisplay
        : "row";
    this.gap = this.gap ? true : false;
    this.wrap = this.wrap ? true : false;
    this.width = this.width ? this.width : "inherit";
    this.height = this.height ? this.height : "inherit";
    this.alignItem = this.alignItem ? this.alignItem : "unset";
  }

  render() {
    const display = {
      row: {
        true: "row column-gap row-gap",
        false: "row",
      },
      column: {
        true: "column column-gap row-gap",
        false: "column",
      },
      wrap: {
        true: "flex-wrap",
        false: "",
      },
    };
    return html`
      <div class="column card">
        <span class="corner-border-top"></span>
        <div
          class="
          card-content 
          ${display[this.contentDisplay][this.gap]} 
          ${display["wrap"][this.wrap]}"
          style="width: ${this.width};height: ${this.height};align-items: ${this
            .alignItem}"
        >
          <slot></slot>
        </div>
        <span class="corner-border-bottom"></span>
      </div>
    `;
  }
}

window.customElements.define("base-card", BaseCard);