import { html, css } from "lit";
import common_styles from "../styles/common-styles.js";
import { BaseForm } from "./base-form.js";

export class SciFiTextArea extends BaseForm {
  static get styles() {
    return [
      common_styles,
      css`
        :host {
          width: 100%;
        }
        .textarea-element {
          display: flex;
          flex: 1;
          position: relative;
          width: 100%;
        }
        .textarea-element label {
          color: var(--color-muted);
          font-size: var(--font-size-xsmall);
          text-shadow: none;
          position: absolute;
          top: 5px;
          left: 5px;
        }
        textarea {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          border: var(--card-border-width) solid var(--primary-color);
          color: var(--secondary-color);
          padding: 18px 10px 5px 10px;
          border-radius: var(--border-radius);
          width: 100%;
        }
        textarea:focus {
          background: linear-gradient(
            to bottom,
            rgba(102, 156, 210, 0.1) 0%,
            rgba(102, 156, 210, 0.2) 100%
          );
          box-shadow: none;
          color: var(--primary-color);
          outline: 0;
        }
      `,
    ];
  }

  static get properties() {
    return {
      elementId: { type: String, attribute: "element-id" },
      text: { type: String },
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.elementId = this.elementId ? this.elementId : null;
    this.text = this.text ? this.text : "";
    this.value = this.value ? this.value : "";
  }

  render() {
    return html`
      <div class="textarea-element">
        <label for="${this.elementId}">${this.text}</label>
        <textarea id="${this.elementId}" @focusout="${this._update}">
${this.value}</textarea
        >
      </div>
    `;
  }

  _update(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("textarea-focusout");
    this.dispatchEvent(
      new CustomEvent("textarea-focusout", {
        bubbles: true,
        composed: true,
        detail: {
          elementId: this.elementId,
          value: e.srcElement.value,
        },
      }),
    );
  }
}

window.customElements.get("sci-fi-textarea") ||
  window.customElements.define("sci-fi-textarea", SciFiTextArea);
