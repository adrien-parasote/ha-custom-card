import { html, css } from "lit";
import { renderSvgIcon } from "../icon-svg.js";
import common_styles from "../../utils/common-styles.js";
import { mdiAlienOutline } from "@mdi/js";
import "./button.js";
import { BaseForm } from "./base-form.js";

export class SciFiDropdown extends BaseForm {
  static get styles() {
    return [
      common_styles,
      css`
        :host {
          width: 100%;
        }
        .dropdown {
          flex-grow: 1;
        }
        .dropdown .dropdown-toggle {
          position: relative;
          font-size: var(--font-size-normal);
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          border-radius: var(--border-radius);
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          width: 100%;
          padding: 0.5rem 1rem;
          border: var(--card-border-width) solid var(--primary-color);
          color: var(--primary-color);
          min-height: 36px;
        }
        .dropdown .no-picture {
          border-top-left-radius: var(--border-radius);
          border-bottom-left-radius: var(--border-radius);
        }
        .dropdown .dropdown-toggle:hover {
          cursor: pointer;
          background-color: var(--secondary-color-opacity);
        }
        .dropdown .dropdown-toggle::after {
          top: 45%;
          right: 15px;
          position: absolute;
          content: "";
          border-top: 0.3em solid;
          border-right: 0.3em solid transparent;
          border-bottom: 0;
          border-left: 0.3em solid transparent;
        }
        .dropdown .dropdown-menu {
          background: black;
          border: var(--card-border-width) solid var(--primary-color);
          color: var(--primary-color);
          position: absolute;
          z-index: 1000;
          display: none;
          width: fit-content;
          text-align: left;
          border-radius: var(--border-radius);
        }
        .dropdown .dropdown-menu.show {
          display: block;
          position: absolute;
        }
        .dropdown .dropdown-menu .dropdown-item {
          border: var(--card-border-width) solid transparent;
          display: block;
          padding: 5px 10px;
          font-weight: 400;
          color: var(--secondary-color);
        }
        .dropdown .dropdown-menu .dropdown-item:hover {
          cursor: pointer;
          border: var(--card-border-width) solid var(--primary-color);
          color: var(--primary-color);
          background-color: var(--secondary-color-opacity);
        }
        .icon-container {
          width: var(--icon-size-small);
          height: var(--icon-size-small);
          align-content: center;
        }
        .icon {
          fill: var(--primary-color);
        }
        .delete {
          width: 35px;
          align-self: center;
          justify-items: center;
        }
        .group-prepend {
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
          padding: 0.3rem 1rem;
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
      picturePath: { type: String, attribute: "picture-path" },
      noPicture: { type: Boolean, attribute: "no-picture" },
      items: { type: Array },
      selected: { type: String },
      isDeletable: { type: Boolean, attribute: "is-deletable" },
      hideDeletable: { type: Boolean, attribute: "hide-deletable" },
    };
  }

  constructor() {
    super();
    this.elementId = this.elementId ? this.elementId : null;
    this.noPicture = this.noPicture ? this.noPicture : false;
    this.picturePath = this.picturePath ? this.picturePath : mdiAlienOutline;
    this.selected = this.selected ? this.selected : "<nothing selected>";
    this.items = this.items ? this.items : new Array(this.selected);
    this.isDeletable =
      this.isDeletable && this.elementId ? this.isDeletable : false;
    this.hideDeletable = this.showDeletable ? this.showDeletable : false;
  }

  render() {
    return html`
      <div class="row dropdown-group">
        ${this.noPicture ? "" : this.renderPicture()}
        <div class="dropdown">
          <button
            class="dropdown-toggle ${this.noPicture ? "no-picture" : ""}"
            @click="${this._showDropDown}"
          >
            ${this.selected}
          </button>
          <div class="dropdown-menu">
            ${this.items.map((value, idx) => {
              return html` <div
                class="dropdown-item"
                @click="${(e) => this._newItemSelected(e, idx, value)}"
              >
                ${value}
              </div>`;
            })}
          </div>
        </div>
        ${this.hideDeletable ? "" : this.renderDelete()}
      </div>
    `;
  }

  _delete(ev) {
    ev.preventDefault();
    this.dispatchEvent(
      new CustomEvent("dropdown-delete", {
        bubbles: true,
        composed: true,
        detail: {
          dropdownElementId: this.elementId,
        },
      }),
    );
  }

  _newItemSelected(ev, idx, newValue) {
    ev.preventDefault();
    this._hideDropDown(ev);
    this.dispatchEvent(
      new CustomEvent("dropdown-select", {
        bubbles: true,
        composed: true,
        detail: {
          elementId: this.elementId,
          dropdownIdSelected: idx,
          value: newValue,
        },
      }),
    );
  }

  _showDropDown(ev) {
    ev.srcElement.parentElement
      .querySelector(".dropdown-menu")
      .classList.toggle("show");
  }

  _hideDropDown(ev) {
    ev.srcElement.parentElement.classList.toggle("show");
  }
}

window.customElements.get("sci-fi-dropdown") ||
  window.customElements.define("sci-fi-dropdown", SciFiDropdown);