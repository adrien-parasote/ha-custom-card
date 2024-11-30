import { html, css } from "lit";
import common_styles from "../styles/common-styles.js";
import { BaseForm } from "./base-form.js";

export class SciFiCheckbox extends BaseForm {
  static get styles() {
    return [
      common_styles,
      css`
        .container {
          position: static;
          margin-top: 0;
          margin-right: 0.3125rem;
          margin-left: 0;
        }
        .container input {
          display: none;
          box-sizing: border-box;
          padding: 0;
        }
        .container label svg {
          border: var(--card-border-width) solid var(--secondary-color);
          border-radius: 50%;
          color: transparent;
          height: var(--icon-size-xsmall);
          width: var(--icon-size-xsmall);
          padding: 5px;
          vertical-align: bottom;
        }
        .container input:checked ~ label svg {
          background: linear-gradient(
            to bottom,
            rgba(105, 211, 251, 0.1) 0%,
            rgba(105, 211, 251, 0.2) 100%
          );
          fill: var(--primary-color);
        }
        .container label div {
          margin: auto;
          text-transform: uppercase;
        }
        .container label:hover {
          cursor: pointer;
        }
      `,
    ];
  }

  static get properties() {
    return {
      elementId: { type: String, attribute: "element-id" },
      label: { type: String },
      checked: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.elementId = this.elementId ? this.elementId : null;
    this.label = this.label ? this.label : "";
    this.checked = this.checked ? this.checked : false;
  }

  render() {
    return html`
      <div class="row container">
        <input
          type="checkbox"
          id="${this.elementId}"
          @change="${this._update}"
          ?checked=${this.checked}
        />
        <label class="row column-gap " for="${this.elementId}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            ></path>
          </svg>
          <div>${this.label}</div>
        </label>
      </div>
    `;
  }

  _update(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("checkbox-change", {
        bubbles: true,
        composed: true,
        detail: {
          elementId: this.elementId,
          value: this.shadowRoot.querySelector("input").checked,
        },
      }),
    );
  }
}

window.customElements.get("sci-fi-checkbox") ||
  window.customElements.define("sci-fi-checkbox", SciFiCheckbox);
