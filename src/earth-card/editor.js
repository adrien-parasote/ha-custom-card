import { BaseEditor } from "./../utils/base-element.js";
import { html } from "lit";

import { renderSvgIcon } from "./../utils/icon-svg.js";
import { mdiDelete, mdiPlus } from "@mdi/js";

export class EarthCardEditor extends BaseEditor {

  setConfig(config) {
    if (!config.time_sensors){
      config["time_sensors"] = new Array();
    }
    if (!config.info_sensors){
      config["info_sensors"] = new Array();
    }
    super.setConfig(config);
    /*
    time_sensors: [
    {
      entity: "binary_sensor.workday_sensor",
    },
    {
      entity: "binary_sensor.school_sensor",
      type: "school",
    },
  ],
  info_sensors: [
    {
      entity: "climate.clou",
      type: "stove",
    },
    {
      entity: "switch.powercar",
      type: "car",
    },
    {
      entity: "light.group",
    },
    {
      entity: "vacuum.dobby",
    },
    {
      entities: [
        "climate.radiator_1",
        "climate.radiator_2",
        "climate.radiator_3",
      ],
      type: "radiators",
    },
  ],
  */
  }

  render() {
    if (!this._config) return html``;
    return html`
      <div class="column row-gap">
        <sci-fi-card content-display="column" gap title="Time sensors">
          <div class="columns row-gap editor-rows">${this._renderTimeRows()}</div>
          <div class="editor-card-actions">
            <div class="btn" @click="${this._addTimeSensor}">
              ${renderSvgIcon(mdiPlus)}
            </div>
          </div>
        </sci-fi-card>
        <sci-fi-card content-display="column" gap title="Info sensors">
          <div class="columns row-gap editor-rows">${this._renderInfoRows()}</div>
          <div class="editor-card-actions">
            <div class="btn" @click="${this._addInfoSensor}">
              ${renderSvgIcon(mdiPlus)}
            </div>
          </div>
        </sci-fi-card>
      </div>
    `;
  }

  _renderTimeRows(){
    return html`
        ${this._config.time_sensors.map((config, idx) => {
          return html`
            <div class="row column-gap editor-row">
              ${this._renderInputTimeBox(config.entity, idx)}
              <div class="row" style="flex-grow: 1;align-self: self-start;">
                ${this._renderSelectTimeBox(config.type, idx)}
                <div class="editor-row-actions">
                  <div class="btn-not-show" @click="${() => this._removeTimeSensor(idx)}">
                    ${renderSvgIcon(mdiDelete)}
                  </div>
                </div>
              </div>
            </div>
          `;
        })}
    `;
  }

  _renderInputTimeBox(entity = null, idx = "") {
    const text = entity ? entity : "";
    return html`
      <div class="input-group">
        <div class="row">
          <div class="input-group-prepend">
            <span class="input-group-text">Entity</span>
          </div>
          <input type="text" @focusout="${this._updateTimeSensorEntity}" idx="${idx}" value="${text}">
        </div>
        <div class="input-info-text">coucou</div>
      </div>
    `;
  }

  _updateTimeSensorEntity(e){
    const entity = e.srcElement.value;
    if(!this.hass.states[entity]){
      console.log(e.srcElement.parentElement.nextSibling)
      console.log(e.srcElement.parentElement.nextSibling.innerHTML)
      e.srcElement.parentElement.nextSibling.innerHTML = entity + " cannot be found in HA";
    }else{
      e.srcElement.parentElement.nextSibling.innerHTML = "";
      const idx = e.srcElement.getAttribute("idx");
      var newConfig = Object.assign({}, this._config);
      newConfig.time_sensors[idx].entity = entity;
      this.__dispatchChange(newConfig);
      
    }
  }

  _renderSelectTimeBox(type = null, idx = "") {
    const selected = type ? type : "";
    return html`
      <div class="dropdown">
        <button class="dropdown-toggle" @click="${this._showDropDown}">${selected}</button>
        <div class="dropdown-menu">
          <div class="dropdown-item" @click="${(e) => this._updateTimeSensorType(e, idx)}">Workday</div>
          <div class="dropdown-item" @click="${(e) => this._updateTimeSensorType(e, idx)}">School</div>
        </div>
      </div>
    `;
  }

  _updateTimeSensorType(e, idx){
    var newConfig = Object.assign({}, this._config);
    newConfig.time_sensors[idx].type = e.srcElement.textContent.toLowerCase();
    e.srcElement.parentElement.classList.toggle("show");
    this.__dispatchChange(newConfig);
  }

  _removeTimeSensor(idx){
    var newConfig = Object.assign({}, this._config);
    newConfig.time_sensors.splice(idx, 1);
    this.__dispatchChange(newConfig);
  }

  _addTimeSensor() {
    var newConfig = Object.assign({}, this._config);
    newConfig.time_sensors.push({entity: null, type: 'workday'});
    this.__dispatchChange(newConfig);
  }

  _renderInfoRows(){
    return html`TO DO`;
  }
  
  _removeInfoSensor(idx){
    var newConfig = Object.assign({}, this._config);
    newConfig.time_sensors.splice(idx, 1);
    this.__dispatchChange(newConfig);
  }

  _addInfoSensor() {
    var newConfig = Object.assign({}, this._config);
    newConfig.info_sensors.push(Object.keys({entity: null, type: null}));
    this.__dispatchChange(newConfig);
  }

  _showDropDown(ev) {
    ev.srcElement.nextSibling.classList.toggle("show");
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
