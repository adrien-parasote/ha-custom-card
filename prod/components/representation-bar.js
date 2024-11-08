import {
  LitElement,
  html,
  css,
  svg,
} from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom CSS
import styles from "./common-styles.js";

// Version
const VERSION = "1.0";
console.info(
  `%cREPRESENTATION-BAR Version: ${VERSION}`,
  "color: rgb(105, 211, 251); font-weight: bold; background: black",
);

export class RepresentationBar extends LitElement {
  static styles = [
    styles,
    css`
      .column {
        gap: 5px;
        padding: 5px 0;
      }
      .svg-container {
        display: flex;
      }
      .path {
        fill: none;
        stroke-width: 5px;
        filter: drop-shadow(0px 0px 5px var(--color-darkblue));
        -webkit-filter: drop-shadow(0px 0px 5px var(--color-darkblue));
      }
      .path-warning {
        fill: none;
        stroke-width: 5px;
        filter: drop-shadow(0px 0px 5px var(--color-amber));
        -webkit-filter: drop-shadow(0px 0px 5px var(--color-amber));
      }
      .text {
        text-align: center;
        text-shadow: 0px 0px 5px var(--color-darkblue);
        font-weight: bold;
      }
      .warning {
        color: var(--color-amber);
        text-shadow: 0px 0px 5px var(--color-amber);
      }
    `,
  ];

  static get properties() {
    return {
      val: { type: Number },
      max: { type: Number },
      text: { type: String },
      threshold: { type: Number },
      size: { type: String },
      _warning: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.text = this.text ? this.text : "";
    this.val = this.val ? this.val : 0;
    this.max = this.max ? this.val : 100;
    this.size = this.size ? this.size : "100%";
    this._warning = this._warning ? this._warning : false;
  }

  render() {
    return html`
      <div class="column">
        <div
          class="svg-container"
          style="height: ${this.size};width: ${this.size};"
        >
          <svg width="100%" viewBox="0 0 100 200" style="background: none;">
            ${this.__buildRows()}
          </svg>
        </div>
        <div class="text ${this._warning ? "warning" : ""}">${this.text}</div>
      </div>
    `;
  }

  __buildRows() {
    const nb_colored = Math.floor((this.val * 20) / this.max);
    const rows = Array.from(Array(20).keys());
    this._warning = this.val / this.max < this.threshold;
    return svg`${rows.map((nb) => {
      return this.__buildRow(nb, nb <= 20 - nb_colored);
    })}`;
  }

  __buildRow(nb, disable) {
    const yPos = 5 + nb * 10;
    const color = disable
      ? "darkblue-opacity"
      : this._warning
        ? "amber"
        : "lightblue";
    return svg`
      <path style="stroke: var(--color-${color});" d="M 5 ${yPos} L 95 ${yPos}" class="path${this._warning ? "-warning" : ""}"/>
    `;
  }
}

window.customElements.define("representation-bar", RepresentationBar);
