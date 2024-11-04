import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom CSS
import styles from "./common-styles.js";

// Version
const VERSION = "1.0";
console.info(
  `%cACTION-CARD Version: ${VERSION}`,
  "color: rgb(105, 211, 251); font-weight: bold; background: black",
);

export class ActionCard extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        align-items: center;
        text-align: center;
        padding: 5px;
        border-radius: var(--border-radius);
        height: var(--action-size);
        width: var(--action-size);
        justify-content: center;
        font-size: var(--font-size-small);
        overflow: hidden;
        position: relative;
        z-index: 0;
        color: var(--action-color);
        text-shadow: none;
      }
      .column:before {
        content: "";
        position: absolute;
        z-index: -2;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        background-repeat: no-repeat;
        background-size:
          50% 50%,
          50% 50%;
        background-position:
          0 0,
          100% 0,
          100% 100%,
          0 100%;
        background-image: linear-gradient(
            var(--color-lightyellow),
            var(--color-lightyellow)
          ),
          linear-gradient(var(--color-brass), var(--color-brass)),
          linear-gradient(var(--color-lightyellow), var(--color-lightyellow)),
          linear-gradient(var(--color-brass), var(--color-brass));

        -webkit-animation-name: rotate;
        -webkit-animation-duration: 4s;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-name: rotate;
        animation-duration: 4s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .column:after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 3px;
        top: 3px;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        background-color: var(--action-background-color);
        border-radius: var(--border-radius);
      }
      .column:hover {
        cursor: pointer;
        font-weight: bold;
        color: white;
      }
      .column:hover:after {
        background-color: var(--color-darkyellow);
      }
      @-webkit-keyframes rotate {
        from {
          -webkit-transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes rotate {
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
      id: { type: String },
      icon: { type: String },
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.id = this.id ? this.id : null;
    this.icon = this.icon ? this.icon : "mdi:cursor-default";
    this.title = this.title ? this.title : "Default title";
  }

  render() {
    return html`
      <div class="column" @click=${(e) => this.__tapped(e)}>
        <ha-icon icon="${this.icon}"></ha-icon>
        <div class="title-action">${this.title}</div>
      </div>
    `;
  }

  __tapped(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent("action-tapped", {
        bubbles: true,
        composed: true,
        detail: {
          id: this.id,
        },
      }),
    );
  }
}

window.customElements.define("action-card", ActionCard);
