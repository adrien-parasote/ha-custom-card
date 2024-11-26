import { html, LitElement } from "lit";
import { renderSvgIcon } from "../icon-svg.js";
import { mdiDelete } from "@mdi/js";

export class BaseForm extends LitElement {
  renderPicture() {
    if (!this.notMdi) {
      return html`
        <div class="group-prepend">
          <span class="group-text">
            <div class="icon-container">${renderSvgIcon(this.picturePath)}</div>
          </span>
        </div>
      `;
    } else {
      return html`
        <div class="group-prepend">
          <span class="group-text">
            <div class="svg-container">${this.picturePath}</div>
          </span>
        </div>
      `;
    }
  }

  renderDelete() {
    return html`
      <div class="delete">
        <sci-fi-button
          class="${!this.isDeletable ? "hide" : ""}"
          picture-path="${mdiDelete}"
          @click="${this._delete}"
        ></sci-fi-button>
      </div>
    `;
  }
}
