import {css, html} from 'lit';
import {parse, stringify} from 'yaml';

import {BaseEditor} from '../../helpers/cards/base-editor.js';
import '../../helpers/form/button.js';
import '../../helpers/form/checkbox.js';
import '../../helpers/form/dropdown.js';
import '../../helpers/form/input.js';
import '../../helpers/form/textarea.js';
import styles from '../../helpers/styles/common-styles.js';
import editorStyles from '../../helpers/styles/editor-styles.js';
import {getIcon} from '../../helpers/styles/icon-svg.js';

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
        .first-row {
          align-items: center;
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
          <sci-fi-input 
          @input-focusout="${(e) => this._update(e, 'entity')}" 
          element-id="${idx}" 
          text="Entity"
            value="${elt.entity}" 
            no-picture 
            hide-deletable>
          </sci-fi-input>

          <div class="column appearance">
            <div class="title row">
              <div class="svg-container">${getIcon('mdiPaletteOutline')}</div>
              <div>Appearance</div>
            </div>
            <div class="column row-gap">
              <div class="row column-gap first-row">
                <sci-fi-input 
                  @input-focusout="${(e) => this._update(e, 'name')}" 
                  element-id="${idx}" 
                  text="Action name" 
                  value="${elt.name}" 
                  no-picture 
                  hide-deletable>
                </sci-fi-input>
                <sci-fi-checkbox 
                  @checkbox-change="${(e) => this._update(e, 'hasIcon')}"
                  ?checked=${elt.has_icon}
                  element-id="${idx}"  
                  label="Add Icon ?">
                </sci-fi-checkbox>
              </div>
              ${elt.has_icon ? this._renderDropBoxIcon(idx, elt) : ''}
            </div>
          </div>

          <div class="column actions">
            <div class="title row column-gap">
              <div class="svg-container">${getIcon('mdiBullhornVariantOutline')}</div>
              <div>Action call</div>
              </div>
              <sci-fi-input 
                @input-focusout="${(e) => this._update(e, 'service')}" 
                element-id="${idx}" 
                text="Service" 
                value="${elt.service}" 
                no-picture 
                hide-deletable>
              </sci-fi-input>
              <sci-fi-textarea @textarea-focusout="${(e) => this._update(e, 'service_data')}" element-id="${idx}" text="Service data (optional)" value="${stringify(elt.service_data)}"></sci-fi-textarea>
              </div>
            </div>
          </div>
        </div>
      </sci-fi-accordion-card>
    `;
  }

  _renderDropBoxIcon(idx, elt) {
    return html`
      <sci-fi-dropdown-icon
        @dropdown-select="${(e) => this._update(e, 'icon')}"
        element-id="${idx}"
        icon-name="${elt.icon}"
        hide-deletable
        selected="${elt.icon}"
      >
      </sci-fi-dropdown-icon>
    `;
  }

  _update(e, type) {
    e.preventDefault();
    e.stopPropagation();
    var idx = e.detail.elementId;
    var newConfig = this.getNewConfig();
    switch (type) {
      case 'entity':
        newConfig.actions[idx].entity = e.detail.value;
        break;
      case 'name':
        newConfig.actions[idx].name = e.detail.value;
        break;
      case 'hasIcon':
        newConfig.actions[idx].has_icon = e.detail.value;
        break;
      case 'icon':
        newConfig.actions[idx].icon = e.detail.value;
        break;
      case 'service':
        newConfig.actions[idx].service = e.detail.value;
        break;
      default:
        //service_data
        newConfig.actions[idx].service_data = parse(e.detail.value);
    }
    this.dispatchChange(newConfig);
  }

  _add(e) {
    e.preventDefault();
    e.stopPropagation();
    var newConfig = this.getNewConfig();
    newConfig.actions.push({
      entity: '',
      has_icon: false,
      name: '',
      icon: 'mdiAlienOutline',
      service: '',
      service_data: {entity_id: ''},
    });
    this.dispatchChange(newConfig);
  }

  _deleteRow(e) {
    e.preventDefault();
    e.stopPropagation();
    var newConfig = this.getNewConfig();
    newConfig.actions.splice(e.detail.elementId, 1);
    this.dispatchChange(newConfig);
  }
}
