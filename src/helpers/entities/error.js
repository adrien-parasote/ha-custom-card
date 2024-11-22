import { html, LitElement, css } from "lit";
import { renderSvgIcon } from "../icon-svg.js";
import { mdiAlertOutline } from "@mdi/js";
import common_styles from "../../utils/common-styles.js";

export class SciFiErrorInfo extends LitElement {
  static get styles() {
    return [
      common_styles,
      css`
        :host {
          height: 100%;
        }
        .content {
          align-items: center;
          height: 100%;
        }
        .title {
          font-size: var(--font-size-small);
          color: var(--color-error-icon);
          text-shadow: 0px 0px 5px var(--color-error-icon);
        }
        .icon-container {
          width: 23px;
          height: 100%;
          align-content: center;
        }
        .icon {
          fill: var(--color-error-icon);
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="column content" no-padding>
        <div class="icon-container">${renderSvgIcon(mdiAlertOutline)}</div>
        <div class="title">Not found</div>
      </div>
    `;
  }
}

window.customElements.get("sci-fi-error-info") ||
  window.customElements.define("sci-fi-error-info", SciFiErrorInfo);
