import { BaseEditor } from "./../../utils/base-editor.js";
import styles from "./../../utils/common-styles.js";
import editorStyles from "./../../utils/editor-styles.js";
import { html, css } from "lit";

import { mdiLightbulbGroup, mdiRobotVacuumVariant } from "@mdi/js";
import { stoveOff } from "../../helpers/svg/stove.js";

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
      `
    ];
  }

  // Private
  _dropdownEntityType = {
    light: mdiLightbulbGroup,
    stove: stoveOff,
    vacuum: mdiRobotVacuumVariant,
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
          <sci-fi-button has-border @click="${this._addInfo}"></sci-fi-button>
        </div>
      </sci-fi-card>
    `;
  }

  _renderRow(info, idx, ableToDelete) {
    const entity = info.entity;
    const selectedType = info.type;
    return html`
      <div class="row column-gap editor-row">
        <sci-fi-input
          element-id="${idx}"
          picture-path="${this._dropdownEntityType[selectedType]}"
          ?not-mdi=${selectedType == "stove"}
          hide-deletable
          text="${entity}"
          @input-focusout="${this._updateInfo}"
        >
        </sci-fi-input>
        <sci-fi-dropdown
          element-id="${idx}"
          no-picture
          selected="${selectedType}"
          .items="${Object.keys(this._dropdownEntityType)}"
          ?is-deletable=${ableToDelete}
          @dropdown-select="${this._updateInfo}"
          @dropdown-delete="${this._removeInfo}"
        >
        </sci-fi-dropdown>
      </div>
    `;
  }

  _updateInfo(e) {
    console.log(e.detail);
    console.log(e.type);
    /*
    var newConfig = this.getNewConfig();
    newConfig.info[e.detail.dropdownElementId] = e.detail.value;
    this.dispatchChange(newConfig);
    */
  }

  _removeInfo(e) {
    var newConfig = this.getNewConfig();
    newConfig.info.splice(e.detail.dropdownElementId, 1);
    this.dispatchChange(newConfig);
  }

  _addInfo(e) {
    var newConfig = this.getNewConfig();
    newConfig.info.push({ entity: "light.entity", type: "light" });
    this.dispatchChange(newConfig);
  }
}
