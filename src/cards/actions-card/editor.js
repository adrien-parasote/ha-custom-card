import { BaseEditor } from "../../helpers/cards/base-editor.js";
import styles from "../../helpers/styles/common-styles.js";
import editorStyles from "../../helpers/styles/editor-styles.js";
import { html, css } from "lit";
import { getIcon } from "../../helpers/styles/icon-svg.js";

import "../../helpers/form/dropdown.js";
import "../../helpers/form/input.js";
import "../../helpers/form/textarea.js";
import "../../helpers/form/button.js";

export class ActionsCardEditor extends BaseEditor {
  static get styles() {
    return [
      styles,
      editorStyles,
      css`
        .svg-container {
          width: var(--icon-size-small);
          height: var(--icon-size-small);
          fill: var(--primary-color);
        }
        .title {
          border-bottom: var(--card-border-width) solid var(--secondary-color);
          padding-bottom: 5px;
          margin-bottom: 10px;
          text-transform: uppercase;
          font-weight: 400;
        }
      `,
    ];
  }

  // Private

  render() {
    if (!this._config) return html``;
    const ableToDelete = this._config.actions.length > 1;
    return html`
      <sci-fi-card content-display="column" gap title="Actions to display">
        <div class="column row-gap editor-rows">
          ${this._config.actions.map((elt, idx) => {
            return this._renderRow(elt, idx, ableToDelete);
          })}
        </div>
        <div class="editor-card-actions">
          <sci-fi-button
            has-border
            @button-click="${this._add}"
          ></sci-fi-button>
        </div>
      </sci-fi-card>
    `;
  }

  _renderRow(elt, idx, ableToDelete) {
    return html`
      <sci-fi-accordion-card
        element-id="${idx}"
        title="Button ${idx}"
        icon="mdiGestureTap"
        ?deletable=${ableToDelete}
        open
        @accordion-delete="${this._deleteRow}"
        >
        <div class="column row-gap">
          <div>
            <sci-fi-input 
            @input-focusout="${this._entityChange}" 
            element-id="${idx}" 
            text="Entity"
             value="${elt.entity}" 
             no-picture 
             hide-deletable>
            </sci-fi-input>

            <div class="column appearance">
              <div class="title row column-gap">
                <div class="svg-container">${getIcon("mdiPaletteOutline")}</div>
                <div>Appearance</div>
              </div>
              <div class="row column-gap">
                <sci-fi-input 
                  @input-focusout="${this._nameChange}" 
                  element-id="${idx}" 
                  text="Action name" 
                  value="${elt.name}" 
                  no-picture 
                  hide-deletable>
                </sci-fi-input>
                <sci-fi-dropdown-icon @dropdown-select="${this._iconChange}" element-id="${idx}" icon-name="${elt.icon}" hide-deletable ></sci-fi-dropdown-icon>
              </div>
            </div>

            <div class="column actions">
            <div class="title row column-gap">
              <div class="svg-container">${getIcon("mdiBullhornVariantOutline")}</div>
              <div>Action call</div>
              </div>
              <sci-fi-input 
                @input-focusout="${this._serviceChange}" 
                element-id="${idx}" 
                text="Service" 
                value="${elt.name}" 
                no-picture 
                hide-deletable>
              </sci-fi-input>
              <sci-fi-textarea @textarea-focusout="${this._serviceDataChange}" element-id="${idx}" text="Service data (optional)" value="${elt.service_data}"></sci-fi-textarea>
              </div>
            </div>

          </div>
        </div>
      </sci-fi-accordion-card>
    `;
  }

  _entityChange(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("_entityChange");
    console.log(e.detail, e.type);
  }

  _nameChange(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("_entityChange");
    console.log(e.detail, e.type);
  }

  _iconChange(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("_iconChange");
    console.log(e.detail, e.type);
  }

  _serviceChange(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("_serviceChange");
    console.log(e.detail, e.type);
  }

  _serviceDataChange(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("_serviceDataChange");
    console.log(e.detail, e.type);
  }

  _deleteRow(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("_deleteRow");
    console.log(e.detail, e.type);
  }

  /*
  _update(e) {
    e.preventDefault();
    e.stopPropagation();
    var newConfig = this.getNewConfig();
    this.dispatchChange(newConfig);
  }
*/
  _add(e) {
    e.preventDefault();
    e.stopPropagation();
    var newConfig = this.getNewConfig();
    newConfig.actions.push({
      entity: "",
      name: "",
      icon: "mdiAlienOutline",
      service: "",
      service_data: {},
    });
    this.dispatchChange(newConfig);
  }
}
