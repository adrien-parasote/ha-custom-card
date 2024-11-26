import { LitElement, html, css } from "lit";
import styles from "../../utils/common-styles.js";

export class Toast extends LitElement {
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
        right: 10px;
      }
      .toast {
        visibility: hidden;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(0, 0, 0, 0.2) 100%
        );
        border: 1px solid var(--secondary-color);
        border-radius: 0.25rem;
        animation:
          fadein 2.5s,
          fadeout 2.5;
      }
      .toast-header {
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(0, 0, 0, 0.2) 100%
        );
        background-color: var(--secondary-color-opacity);
        padding: 5px 10px;
        border-bottom: 1px solid var(--secondary-color);
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
      .toast-body {
        color: var(--primary-color);
        padding: 10px;
        word-wrap: break-word;
        text-shadow: none;
      }
      .toast.show {
        visibility: visible;
        -webkit-animation-name:
          fadeIn 0.5s ease-in forwards,
          fadeOut 3.5s 4s ease-out forwards;
        animation:
          fadeIn 0.5s ease-in forwards,
          fadeOut 3.5s 4s ease-out forwards;
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

  render() {
    return html`
      <div class="toast">
        <div class="toast-header"><div>Info</div></div>
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
    }, 10000);
  }
}

window.customElements.define("toast-card", Toast);
