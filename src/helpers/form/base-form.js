import { html, LitElement } from "lit";
import { getIcon } from "../icon-svg.js";
import { mdiDelete } from "@mdi/js";

export class BaseForm extends LitElement {
  renderPicture() {
    return html`
      <div class="group-prepend">
        <span class="group-text">
          <div class="icon-container">${getIcon(this.iconName)}</div>
        </span>
      </div>
    `;
  }

  renderDelete() {
    return html`
      <div class="delete">
        <sci-fi-button
          class="${!this.isDeletable ? "hide" : ""}"
          icon-name="mdiDelete"
          @click="${this._delete}"
        ></sci-fi-button>
      </div>
    `;
  }
}
