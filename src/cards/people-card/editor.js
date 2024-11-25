import { BaseEditor } from "./../../utils/base-editor.js";
import { html } from "lit";

import { renderSvgIcon } from "./../../helpers/icon-svg.js";
import { mdiPlus, mdiAccount } from "@mdi/js";

import "../../helpers/form/dropdown.js";
import "../../helpers/form/button.js";

export class PeopleCardEditor extends BaseEditor {
  static get properties() {
    return {
      _config: { type: Object },
      _personEntities: { type: Object },
    };
  }

  setConfig(config) {
    if (!this._personEntities) {
      const hassPerson = Object.keys(this.hass.states)
        .filter((key) => key.startsWith("person."))
        .reduce((cur, key) => {
          return Object.assign(cur, {
            [key]: this.hass.states[key].attributes.friendly_name,
          });
        }, {});
      this._personEntities = Object.fromEntries(
        Object.entries(hassPerson).map(([key, value]) => [value, key]),
      );
    }
    super.setConfig(config);
  }

  render() {
    if (!this._config || !this._personEntities) return html``;
    return html`
      <sci-fi-card content-display="column" gap title="crew">
        <div class="columns row-gap editor-rows">${this._renderRows()}</div>
        <div class="editor-card-actions">
          <sci-fi-button has-border @click="${this._addPerson}"></sci-fi-button>
        </div>
      </sci-fi-card>
    `;
  }

  _renderRows() {
    const ableToDelete = this._config.people.length > 1;
    return html`
      ${this._config.people.map((entityId, idx) => {
        const entity = this.hass.states[entityId];
        return html`
          <div class="row column-gap editor-row">
            <sci-fi-dropdown
              element-id="${idx}"
              picture-path="${mdiAccount}"
              selected="${entity.attributes.friendly_name}"
              .items="${Object.keys(this._personEntities)}"
              ?is-deletable=${ableToDelete}
              @dropdown-select="${this._updatePerson}"
              @dropdown-delete="${this._removePeople}"
            >
            </sci-fi-dropdown>
          </div>
        `;
      })}
    `;
  }

  _updatePerson(e) {
    var newConfig = this.getNewConfig();
    newConfig.people[e.detail.dropdownElementId] =
      this._personEntities[e.detail.value];
    this.__dispatchChange(newConfig);
  }

  _removePeople(e) {
    var newConfig = this.getNewConfig();
    newConfig.people.splice(e.detail.dropdownElementId, 1);
    this.__dispatchChange(newConfig);
  }

  _addPerson(e) {
    var newConfig = this.getNewConfig();
    newConfig.people.push(Object.values(this._personEntities)[0]);
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
