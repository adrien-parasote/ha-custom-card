import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom CSS
import styles from "./common-styles.js";

// Version
import { TOAST_CARD_VERSION } from "./config.js";

export class ToastCard extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        z-index: 1000;
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
        max-width: 100%;
        min-width: 250px;
        position: fixed;
        bottom: 10px;
        left: 60px;
      }
      .toast {
        visibility: hidden;
        background-color: var(--toast-background-color);
        border: 1px solid var(--color-darkblue);
        border-radius: 0.25rem;
        animation:
          fadein 2.5s,
          fadeout 2.5;
      }
      .toast-header {
        background-color: var(--color-darkblue-opacity);
        padding: 5px 10px;
        border-bottom: 1px solid var(--color-darkblue);
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .toast-header > div {
        text-transform: uppercase;
        text-shadow: none;
        font-weight: bold;
        flex-grow: 1;
      }
      .toast-btn-close {
        color: var(--color-lightblue);
        text-shadow: 0px 0px 5px var(--color-darkblue);
        font-weight: bold;
        box-sizing: content-box;
        border: none;
        background: transparent;
        cursor: pointer;
      }
      .toast-body {
        color: var(--toast-body-color);
        padding: 10px;
        word-wrap: break-word;
        text-shadow: none;
      }
      .toast.show {
        visibility: visible;
        -webkit-animation-name:
          fadeIn 0.5s ease-in forwards,
          fadeOut 3.5s 1s ease-out forwards;
        animation:
          fadeIn 0.5s ease-in forwards,
          fadeOut 3.5s 1s ease-out forwards;
      }
      @-webkit-keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @-webkit-keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `,
  ];

  static get properties() {
    return {
      msg: { type: String },
    };
  }

  constructor() {
    super();
    this.msg = this.msg ? this.msg : "";
    console.info(
      `%cTOAST-CARD Version: ${TOAST_CARD_VERSION}`,
      "color: rgb(105, 211, 251); font-weight: bold; background: black",
    );
  }

  render() {
    return html`
      <div class="toast">
        <div class="toast-header"><div>Message</div></div>
        <div class="toast-body">${this.msg}</div>
      </div>
    `;
  }

  show(msg) {
    this.msg = msg;
    const toast = this.shadowRoot.querySelector(".toast");
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 4000);
  }
}

window.customElements.define("toast-card", ToastCard);
