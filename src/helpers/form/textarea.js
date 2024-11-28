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
        textarea {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          border: var(--card-border-width) solid var(--primary-color);
          color: var(--secondary-color);
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
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
    };
  }

  constructor() {
    super();
    this.elementId = this.elementId ? this.elementId : null;
    this.text = this.text ? this.text : "";
  }

  render() {
    return html`<textarea @focusout="${this._update}">${this.text}</textarea>`;
  }

  _update(ev) {
    ev.preventDefault();
    console.log("textarea-focusout");
    this.dispatchEvent(
      new CustomEvent("textarea-focusout", {
        bubbles: true,
        composed: true,
        detail: {
          elementId: this.elementId,
          value: ev.srcElement.value,
        },
      }),
    );
  }
}

window.customElements.get("sci-fi-textarea") ||
  window.customElements.define("sci-fi-textarea", SciFiTextArea);
