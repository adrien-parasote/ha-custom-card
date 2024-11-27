import { html, css } from "lit";
import common_styles from "../styles/common-styles.js";
import "./button.js";
import { BaseForm } from "./base-form.js";

export class SciFiInput extends BaseForm {
  static get styles() {
    return [
      common_styles,
      css`
        :host {
          width: 100%;
        }
        .input-group {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .input-group .group-prepend {
          display: flex;
        }
        .input-group .group-prepend .group-text {
          display: flex;
          align-items: center;

          border-radius: var(--border-radius);
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          color: white;
          font-size: var(--font-size-small);
          text-align: center;
          border: var(--card-border-width) solid var(--primary-color);
          background-color: var(--secondary-color-opacity);
          margin-right: -1px;
          padding: 0.5rem 1rem;
        }
        .input-error .group-prepend .group-text {
          border-color: var(--color-active-icon);
          color: var(--color-active-icon);
        }
        .input-group input {
          border-radius: var(--border-radius);
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          width: 100%;
          padding: 0.5rem 1rem;
          font-size: var(--font-size-normal);
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          border: var(--card-border-width) solid var(--primary-color);
          color: var(--primary-color);
        }
        .input-error input {
          border-color: var(--color-active-icon);
          color: var(--color-active-icon);
        }
        .input-group .input-info-text {
          font-size: var(--font-size-small);
          color: white;
          height: var(--font-size-small);
        }
        .input-error .input-info-text {
          color: var(--color-active-icon);
        }
        .delete {
          width: 35px;
          align-self: center;
          justify-items: center;
        }
        .icon-container {
          width: var(--icon-size-small);
          height: var(--icon-size-small);
          align-content: center;
        }
        .icon {
          fill: var(--primary-color);
        }
        .input-error .icon {
          fill: var(--color-active-icon);
        }
        .hide {
          display: none;
        }
        .svg-container {
          width: var(--icon-size-small);
          height: var(--icon-size-small);
          stroke: var(--primary-color);
        }
      `,
    ];
  }

  static get properties() {
    return {
      elementId: { type: String, attribute: "element-id" },
      iconName: { type: String, attribute: "icon-name" },
      noPicture: { type: Boolean, attribute: "no-picture" },
      error: { type: Boolean },
      text: { type: String },
      tips: { type: String }, // TODO
      isDeletable: { type: Boolean, attribute: "is-deletable" },
      hideDeletable: { type: Boolean, attribute: "hide-deletable" },
    };
  }

  constructor() {
    super();
    this.elementId = this.elementId ? this.elementId : null;
    this.iconName = this.iconName ? this.iconName : "mdiAlienOutline";
    this.noPicture = this.noPicture ? this.noPicture : false;
    this.text = this.text ? this.text : "";
    this.tips = this.tips ? this.tips : "";
    this.error = this.error ? this.error : false;
    this.isDeletable =
      this.isDeletable && this.elementId ? this.isDeletable : false;
    this.hideDeletable = this.hideDeletable ? this.hideDeletable : false;
  }

  render() {
    return html`
      <div class="input-group ${this.error ? "input-error" : ""}">
        <div class="row">
          ${this.noPicture ? "" : this.renderPicture()}
          <input type="text" @focusout="${this._update}" value="${this.text}" />
          ${this.hideDeletable ? "" : this.renderDelete()}
        </div>
        <div class="input-info-text">${this.tips}</div>
      </div>
    `;
  }

  _update(ev) {
    ev.preventDefault();
    this.dispatchEvent(
      new CustomEvent("input-focusout", {
        bubbles: true,
        composed: true,
        detail: {
          elementId: this.elementId,
          value: ev.srcElement.value,
        },
      }),
    );
  }

  _delete(ev) {
    ev.preventDefault();
    this.dispatchEvent(
      new CustomEvent("input-delete", {
        bubbles: true,
        composed: true,
        detail: {
          elementId: this.elementId,
        },
      }),
    );
  }
}

window.customElements.get("sci-fi-input") ||
  window.customElements.define("sci-fi-input", SciFiInput);
