import { BaseEditor } from "../utils/base-element.js";
import { html } from "lit";

export class PersonBadgeEditor extends BaseEditor {
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
    super.setConfig(config);
  }
  render() {
    if (!this._config || !this._personEntities) return html``;
    return html`
      <sci-fi-card content-display="column" gap title="person">
        <div class="columns row-gap editor-rows">
          <div class="row column-gap editor-row">
            <div class="dropdown">
              <button class="dropdown-toggle" @click="${this._showDropDown}">
                ${this._config.entity}
              </button>
              <div class="dropdown-menu">
                ${Object.entries(this._personEntities).map((el) => {
                  return html`
                    <div
                      class="dropdown-item"
                      @click="${(e) => this._update(e, el[0])}"
                    >
                      ${el[1].attributes.friendly_name}
                    </div>
                  `;
                })}
              </div>
            </div>
          </div>
        </div>
      </sci-fi-card>
    `;
  }

  _showDropDown(ev) {
    ev.srcElement.nextSibling.classList.toggle("show");
  }

  _update(e, entityId) {
    e.srcElement.parentElement.classList.toggle("show");
    var newConfig = Object.assign({}, this._config);
    newConfig.entity = entityId;
    this._configChange(newConfig);
  }

  _configChange(newConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
