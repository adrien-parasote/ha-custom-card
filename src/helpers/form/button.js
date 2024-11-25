import { html, css, LitElement } from "lit";
import { renderSvgIcon } from "../icon-svg.js";
import common_styles from "../../utils/common-styles.js";
import { mdiPlus } from "@mdi/js";

export class SciFiButton extends LitElement {
  static get styles() {
    return [
      common_styles,
      css`
        .btn {
          background-color: transparent;
          border: none;
          margin: auto;
        }
        .btn-border {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          border-radius: var(--border-radius);
          border: var(--card-border-width) solid var(--primary-color);
          width: var(--icon-size-small);
          height: var(--icon-size-small);
          fill: var(--primary-color);
          padding: 5px;
        }
        .btn .icon {
          fill: var(--secondary-color);
          width: var(--icon-size-normal);
          height: var(--icon-size-normal);
        }
        .btn-border .icon {
          width: var(--icon-size-small);
          height: var(--icon-size-small);
        }
        .btn:hover .icon {
          cursor: pointer;
          fill: var(--primary-color);
        }

        .btn-border:hover {
          background-color: var(--secondary-color-opacity);
        }
      `,
    ];
  }

  static get properties() {
    return {
      hasBorder: { type: Boolean, attribute: "has-border" },
      picturePath: { type: String, attribute: "picture-path" },
    };
  }

  constructor() {
    super();
    this.hasBorder = this.hasBorder ? this.hasBorder : false;
    this.picturePath = this.picturePath ? this.picturePath : mdiPlus;
  }

  render() {
    return html`
      <div
        class="btn ${this.hasBorder ? "btn-border" : ""}"
        @click="${this.click}"
      >
        ${renderSvgIcon(this.picturePath)}
      </div>
    `;
  }

  click(ev) {
    ev.preventDefault();
    this.dispatchEvent(
      new CustomEvent("button-click", {
        bubbles: true,
        composed: true,
        detail: {
          element: this,
        },
      }),
    );
  }
}

window.customElements.get("sci-fi-button") ||
  window.customElements.define("sci-fi-button", SciFiButton);
