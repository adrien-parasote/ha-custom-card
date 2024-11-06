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
      circle {
        filter: url("#drop-shadow-filter-blue");
      }
      .dot {
        transform-origin: 150px 150px;
        animation: spin 5s infinite linear;
        fill: white;
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
          <defs>
            <filter
              id="drop-shadow-filter-blue"
              color-interpolation-filters="sRGB"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
              <feOffset dx="0" dy="0" />
              <feComponentTransfer result="offsetblur">
                <feFuncA id="spread-ctrl" type="linear" slope="1" />
              </feComponentTransfer>
              <feFlood flood-color="var(--color-lightblue)" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
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
      <circle cx="150" cy="150" r="60" style="
          fill: var(--color-${color}); 
          stroke: var(--color-darkblue);
          stroke-width: 10px; 
          stroke-linecap: round;
      "/>
      <circle class="dot ${show}" r="15" cx="50" cy="150"/> 
      <circle class="dot ${show}" r="15" cx="250" cy="150"/>   
    `;
  }
}

window.customElements.define("representation-circle", RepresentationCircle);
