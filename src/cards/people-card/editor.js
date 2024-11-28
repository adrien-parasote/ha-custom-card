import { BaseEditor } from "../../helpers/cards/base-editor.js";
import { html } from "lit";

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
      const hassPerson = Object.keys(this._hass.states)
        .filter((key) => key.startsWith("person."))
        .reduce((cur, key) => {
          return Object.assign(cur, {
            [key]: this._hass.states[key].attributes.friendly_name,
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
          <sci-fi-button has-border @click="${this._add}"></sci-fi-button>
        </div>
      </sci-fi-card>
    `;
  }

  _renderRows() {
    const ableToDelete = this._config.people.length > 1;
    return html`
      ${this._config.people.map((entityId, idx) => {
        const entity = this._hass.states[entityId];
        return html`
          <div class="row column-gap editor-row">
            <sci-fi-dropdown
              element-id="${idx}"
              icon-name="mdiAccount"
              selected="${entity.attributes.friendly_name}"
              .items="${Object.keys(this._personEntities)}"
              ?is-deletable=${ableToDelete}
              @dropdown-select="${this._update}"
              @dropdown-delete="${this._update}"
            >
            </sci-fi-dropdown>
          </div>
        `;
      })}
    `;
  }

  _update(e) {
    e.preventDefault();
    e.stopPropagation();
    var newConfig = this.getNewConfig();
    if (e.type == "dropdown-select") {
      newConfig.people[e.detail.elementId] =
        this._personEntities[e.detail.value];
    } else {
      newConfig.people.splice(e.detail.elementId, 1);
    }
    this.dispatchChange(newConfig);
  }

  _add(e) {
    e.preventDefault();
    e.stopPropagation();
    var newConfig = this.getNewConfig();
    newConfig.people.push(Object.values(this._personEntities)[0]);
    this.dispatchChange(newConfig);
  }
}
