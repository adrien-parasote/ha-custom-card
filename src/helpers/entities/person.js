import { html, LitElement, css } from "lit";
import { renderSvgIcon } from "../../utils/icon-svg.js";
import { mdiHomeOutline, mdiHomeOffOutline } from "@mdi/js";
import common_styles from "../../utils/common-styles.js";

export const STATE_HOME = "home";

export class SciFiPerson extends LitElement {
  static get styles() {
    return [
      common_styles,
      css`
        :host {
          width: fit-content;
          margin: 5px;
        }
        .avatar {
          border: 1px solid var(--secondary-color);
          box-shadow: 0 0 5px 1px var(--secondary-color);
          border-radius: 50%;
          height: var(--icon-size-title);
          width: var(--icon-size-title);
          position: relative;
        }
        .icon-container {
          background-color: var(--secondary-color-opacity);
          border-radius: 50%;
          width: var(--icon-size-small);
          height: var(--icon-size-small);
          position: absolute;
          top: -5px;
          right: -10px;
          text-align: center;
          align-content: end;
        }
        .icon {
          fill: var(--primary-color);
          width: var(--icon-size-xsmall);
          height: var(--icon-size-xsmall);
        }
        img {
          width: auto;
          height: 100%;
          border-radius: 50%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      entityId: { type: String, attribute: "entity-id" },
      state: { type: String },
      picture: { type: String },
    };
  }

  constructor() {
    super();
    this.entityId = this.entityId ? this.entityId : null;
    this.state = this.state ? this.state : STATE_HOME;
    this.picture = this.picture ? this.picture : null;
  }

  render() {
    return html`
      <div class="avatar">
        <img src="${this.picture ? this.picture : ""}" />
        <div class="icon-container">
          ${renderSvgIcon(
            this._state == STATE_HOME ? mdiHomeOutline : mdiHomeOffOutline,
          )}
        </div>
      </div>
    `;
  }
}

window.customElements.get("sci-fi-person") ||
  window.customElements.define("sci-fi-person", SciFiPerson);
