import { html, css } from "lit";
import { SVG_ICONS, getIcon } from "../styles/icon-svg.js";
import common_styles from "../styles/common-styles.js";
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
        .dropdown-group {
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
          color: var(--secondary-color);
          min-height: 42px;
        }
        .dropdown .no-picture {
          border-top-left-radius: var(--border-radius);
          border-bottom-left-radius: var(--border-radius);
        }
        .dropdown .dropdown-toggle:hover {
          cursor: pointer;
          background-color: var(--secondary-color-opacity);
          color: var(--primary-color);
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
      iconName: { type: String, attribute: "icon-name" },
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
    this.iconName = this.iconName ? this.iconName : "mdiAlienOutline";
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
            @click="${this._showHideDropDown}"
          >
            ${this.selected}
          </button>
          <div class="dropdown-menu">
            ${this.items.map((value, idx) => {
              return html` <div
                class="dropdown-item"
                @click="${(e) => this._newItemSelected(e, idx, value)}"
              >
                ${this.renderDropDownItem(value)}
              </div>`;
            })}
          </div>
        </div>
        ${this.hideDeletable ? "" : this.renderDelete()}
      </div>
    `;
  }

  renderDropDownItem(value) {
    return html`${value}`;
  }

  _delete(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("dropdown-delete", {
        bubbles: true,
        composed: true,
        detail: {
          elementId: this.elementId,
        },
      }),
    );
  }

  _newItemSelected(e, idx, newValue) {
    e.preventDefault();
    e.stopPropagation();
    this._showHideDropDown();
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

  _showHideDropDown() {
    this.shadowRoot.querySelector(".dropdown-menu").classList.toggle("show");
  }
}

export class SciFiDropdownIcon extends SciFiDropdown {
  static get properties() {
    return {
      elementId: { type: String, attribute: "element-id" },
      iconName: { type: String, attribute: "icon-name" },
      noPicture: { type: Boolean, attribute: "no-picture" },
      selected: { type: String },
      isDeletable: { type: Boolean, attribute: "is-deletable" },
      hideDeletable: { type: Boolean, attribute: "hide-deletable" },
    };
  }

  constructor() {
    super();
    this.selected = this.selected ? this.selected : "mdiAlienOutline";
    this.items = Object.keys(SVG_ICONS);
    this.items.sort();
  }

  renderDropDownItem(value) {
    return html`<div class="row column-gap" style="align-items: center;">
      <div class="icon-container">${getIcon(value)}</div>
      <div>${value}</div>
    </div>`;
  }
}

window.customElements.get("sci-fi-dropdown") ||
  window.customElements.define("sci-fi-dropdown", SciFiDropdown);
window.customElements.get("sci-fi-dropdown-icon") ||
  window.customElements.define("sci-fi-dropdown-icon", SciFiDropdownIcon);
