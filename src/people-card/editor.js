import { BaseEditor } from "./../utils/base-element.js";
import { html } from "lit";

import { renderSvgIcon } from "./../utils/icon-svg.js";
import { mdiDelete, mdiPlus } from "@mdi/js";

export class PeopleCardEditor extends BaseEditor {
  static get properties() {
    return {
      _config: { type: Object },
      _personEntities: { type: Object },
    };
  }

  setConfig(config) {
    if (!this._personEntities) {
      this._personEntities = Object.keys(this.hass.states)
        .filter((key) => key.startsWith("person."))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: this.hass.states[key] });
        }, {});
    }
    if (!config.people){
      config["people"] = new Array();
    }
    super.setConfig(config);
  }

  render() {
    if (!this._config || !this._personEntities) return html``;
    return html`
      <sci-fi-card content-display="column" gap title="crew">
        <div class="columns row-gap editor-rows">${this._renderRows()}</div>
        <div class="editor-card-actions">
          <div class="btn" @click="${this._addPeople}">
            ${renderSvgIcon(mdiPlus)}
          </div>
        </div>
      </sci-fi-card>
    `;
  }

  _renderRows() {
    return html`
        ${this._config.people.map((entityId, idx) => {
          return html`
            <div class="row column-gap editor-row">
              ${this._renderSelectPeopleBox(entityId, idx)}
              <div class="editor-row-actions">
                <div class="btn-not-show" @click="${() => this._removePeople(idx)}">
                  ${renderSvgIcon(mdiDelete)}
                </div>
              </div>
            </div>
          `;
        })}
    `;
  }

  _renderSelectPeopleBox(entityId = null, idx = "") {
    const selected =
      entityId && this._personEntities[entityId]
        ? this._personEntities[entityId].attributes.friendly_name
        : "";
    return html`
      <div class="dropdown">
        <button class="dropdown-toggle" @click="${this._showDropDown}">
          ${selected}
        </button>
        <div class="dropdown-menu">
          ${Object.entries(this._personEntities).map((el) => {
            return html`<div
              class="dropdown-item"
              @click="${(e) => this._updatePeople(e, idx, el[0])}"
            >
              ${el[1].attributes.friendly_name}
            </div>`;
          })}
        </div>
      </div>
    `;
  }

  _showDropDown(ev) {
    ev.srcElement.nextSibling.classList.toggle("show");
  }

  _updatePeople(e, idx, entityId) {
    var newConfig = Object.assign({}, this._config);
    newConfig.people[idx] = entityId;
    e.srcElement.parentElement.classList.toggle("show");
    this.__dispatchChange(newConfig);
  }

  _addPeople() {
    var newConfig = Object.assign({}, this._config);
    newConfig.people.push(Object.keys(this._personEntities)[0]);
    this.__dispatchChange(newConfig);
  }

  _removePeople(idx) {
    var newConfig = Object.assign({}, this._config);
    newConfig.people.splice(idx, 1);
    this.__dispatchChange(newConfig);
  }

  __dispatchChange(newConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
