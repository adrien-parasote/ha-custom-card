import { BaseEditor } from "../../helpers/cards/base-editor.js";
import styles from "../../helpers/styles/common-styles.js";
import editorStyles from "../../helpers/styles/editor-styles.js";
import { html, css } from "lit";

import "../../helpers/form/dropdown.js";
import "../../helpers/form/input.js";
import "../../helpers/form/button.js";

export class InfoCardEditor extends BaseEditor {
  static get styles() {
    return [
      styles,
      editorStyles,
      css`
        sci-fi-dropdown {
          align-self: baseline;
        }
      `,
    ];
  }

  // Private
  _dropdownEntityType = {
    light: "mdiLightbulbGroup",
    stove: "stoveOff",
    vacuum: "mdiRobotVacuumVariant",
  };

  render() {
    if (!this._config) return html``;
    const ableToDelete = this._config.info.length > 1;
    return html`
      <sci-fi-card content-display="column" gap title="Info to display">
        <div class="columns row-gap editor-rows">
          ${this._config.info.map((elt, idx) => {
            return this._renderRow(elt, idx, ableToDelete);
          })}
        </div>
        <div class="editor-card-actions">
          <sci-fi-button has-border @click="${this._add}"></sci-fi-button>
        </div>
      </sci-fi-card>
    `;
  }

  _renderRow(info, idx, ableToDelete) {
    const entity = info.entity;
    const selectedType = info.type;
    var error = !this._hass.states[entity];
    var textError = error ? "Entity " + entity + " cannot be found" : "";
    return html`
      <div class="row column-gap editor-row">
        <sci-fi-input
          element-id="${idx}"
          icon-name="${this._dropdownEntityType[selectedType]}"
          ?not-mdi=${selectedType == "stove"}
          hide-deletable
          text="${entity}"
          tips="${textError}"
          ?error=${error}
          @input-focusout="${this._update}"
        >
        </sci-fi-input>
        <sci-fi-dropdown
          element-id="${idx}"
          no-picture
          selected="${selectedType}"
          .items="${Object.keys(this._dropdownEntityType)}"
          ?is-deletable=${ableToDelete}
          @dropdown-select="${this._update}"
          @dropdown-delete="${this._update}"
        >
        </sci-fi-dropdown>
      </div>
    `;
  }

  _update(e) {
    e.preventDefault();
    e.stopPropagation();
    var newConfig = this.getNewConfig();
    if (e.type == "dropdown-delete") {
      newConfig.info.splice(e.detail.elementId, 1);
    } else {
      if (e.type == "input-focusout") {
        newConfig.info[e.detail.elementId].entity = e.detail.value;
      } else {
        newConfig.info[e.detail.elementId].type = e.detail.value;
      }
    }
    this.dispatchChange(newConfig);
  }

  _add(e) {
    e.preventDefault();
    e.stopPropagation();
    var newConfig = this.getNewConfig();
    newConfig.info.push({ entity: "light.entity", type: "light" });
    this.dispatchChange(newConfig);
  }
}
