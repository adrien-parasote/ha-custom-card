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
  `%cREPRESENTATION-CIRCLE Version: ${VERSION}`,
  "color: rgb(105, 211, 251); font-weight: bold; background: black",
);

export class RepresentationCircle extends LitElement {
  static styles = [
    styles,
    css`
      .svg-container {
        display: flex;
        flex-direction: row;
        margin: auto;
      }
      svg {
        overflow: hidden;
        display: block;
      }
      .dot {
        transform-origin: 150px 150px;
        animation: spin 5s infinite linear;
      }
      .hide {
        display: none;
      }
      @-webkit-keyframes spin {
        from {
          -webkit-transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  static get properties() {
    return {
      on: { type: String },
      size: { type: String },
    };
  }

  constructor() {
    super();
    this.on = this.on ? this.on : "false";
    this.size = this.size ? this.size : "100%";
  }

  render() {
    return html`
      <div
        class="column svg-container"
        style="height: ${this.size};width: ${this.size};"
      >
        <svg width="100%" viewBox="0 0 300 300" style="background: none;">
          ${this.__buildCircle()}
        </svg>
      </div>
    `;
  }

  __buildCircle() {
    const color = ["on", true, "true"].includes(this.on)
      ? "lightblue"
      : "darkblue-opacity";
    const show = ["on", true, "true"].includes(this.on) ? "show" : "hide";
    return svg`
      <circle 
        cx="150"
        cy="150" 
        r="60"
        style="
          fill: var(--color-${color}); 
          stroke: var(--color-darkblue);
          stroke-width: 10px; 
          stroke-linecap: round;
          filter: drop-shadow(var(--color-${color}) 0px 0px 5px);
        "
      />
      <circle class="dot ${show}" r="15" cx="50" cy="150" style="
        fill: white; 
        stroke-width: none; 
        filter: drop-shadow(var(--color-${color}) 0px 0px 5px);
      "/> 
      <circle class="dot ${show}" r="15" cx="250" cy="150" style="
        fill: white; 
        stroke-width: none; 
        filter: drop-shadow(var(--color-${color}) 0px 0px 5px);
      "/>   
    `;
  }
}

window.customElements.define("representation-circle", RepresentationCircle);
