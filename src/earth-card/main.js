import { LitElement, html } from "lit";

import "./../utils/base-card.js";
import { renderSvgIcon } from "./../utils/icon-svg.js";
import animatedEarth from "./svg/earth.js";
import {
  mdiBriefcaseOutline,
  mdiBriefcaseOffOutline,
  mdiHomeOutline,
  mdiAccountSchoolOutline,
} from "@mdi/js";

import { VERSION } from "./config.js";

// Custom CSS
import common_styles from "./../common-styles.js";
import styles from "./styles.js";

// Constant
import {
  STATE_TIME_ON,
  ICON_STATE_CLIMATE,
  ICON_STATE_STOVE,
  ICON_STATE_CAR,
  ICON_STATE_LIGHT,
  ICON_STATE_VACUUM,
} from "./const.js";

export class EarthCard extends LitElement {
  static get styles() {
    return [common_styles, styles];
  }

  static get properties() {
    return {
      _date: { type: Object },
    };
  }

  constructor() {
    super();
    if (VERSION == "DEV") {
      import("./config.js").then(({ hass, config }) => {
        this.hass = hass;
        this.setConfig(config);
        this.requestUpdate();
      });
    } // Clock
    this._date = new Date();
    console.info(
      `%cEARTH-CARD Version: ${VERSION}`,
      "color: rgb(105, 211, 251); font-weight: bold; background: black",
    );
    // Auto update date
    setInterval(() => {
      this._date = new Date();
    }, 1000);
  }

  __configTimeSensors(config) {
    if (!config.time_sensors) {
      throw new Error("You need to define time sensors");
    }
    if (!Array.isArray(config.time_sensors)) {
      throw new Error("Time sensors must be a list");
    }
    // Define default value if needed
    config.time_sensors.map((entity) => {
      if (!entity.entity)
        throw new Error("You need to define an entity for each time sensors");
      if (!entity.type) entity.type = "workday";
    });
  }

  __configInfoSensors(config) {
    if (!config.info_sensors) {
      throw new Error("You need to define info sensors");
    }
    if (!Array.isArray(config.info_sensors)) {
      throw new Error("Info sensors must be a list");
    }

    // Define default value if needed
    config.info_sensors.map((entity) => {
      if (!entity.type) entity.type = entity.entity.split(".")[0];
      if (
        !["car", "stove", "light", "radiators", "vacuum"].includes(entity.type)
      )
        throw new Error(
          "Info sensor entity <type> must be car or stove or light or radiators, current is " +
            entity.type,
        );
      if (entity.type == "radiators") {
        if (!entity.entities)
          throw new Error("Radiators type must be link to a list of entities");
      } else {
        if (!entity.entity)
          throw new Error("You need to define an entity for each info sensors");
      }
    });
  }

  setConfig(config) {
    // Validate config entries
    this.__configTimeSensors(config);
    this.__configInfoSensors(config);
    this.config = config;
  }

  getCardSize() {
    return 1;
  }

  render() {
    if (this.hass == undefined) return html``;
    return html`
      <div class="row">
        ${this.__renderDateCard()}
        <div class="planet-svg-container">${animatedEarth}</div>
        <base-card
          content-display="row"
          align-item="center"
          wrap
          gap
          class="info-panel"
        >
          ${this.__renderInfo()}
        </base-card>
      </div>
    `;
  }

  __renderInfo() {
    return this.config.info_sensors.map((sensor) => {
      const entity = this.hass.states[sensor.entity];
      if (sensor.type == "stove")
        return this.__renderInfoCard(ICON_STATE_STOVE[entity.state]);
      if (sensor.type == "car") return this.__renderCar(entity);
      if (sensor.type == "light")
        return this.__renderInfoCard(
          ICON_STATE_LIGHT[entity.state],
          true,
          "info-icon-" + entity.state,
        );
      if (sensor.type == "radiators")
        return this.__renderRadiators(sensor.entities);
      if (sensor.type == "vacuum")
        return this.__renderInfoCard(
          ICON_STATE_VACUUM[entity.state],
          !["cleaning", "returning"].includes(entity.state),
          entity.state != "error" ? "icon" : "icon-error",
        );
    });
  }

  __renderRadiators(radiators) {
    const globalState = this.__getRadiatorsGlobalState(radiators);
    return this.__renderInfoCard(
      ICON_STATE_CLIMATE[globalState],
      true,
      "info-icon-" + (globalState == "heat" ? "on" : "off"),
    );
  }

  __getRadiatorsGlobalState(radiators) {
    let state = "off";
    radiators.map((entity) => {
      const radiators = this.hass.states[entity];
      if (
        radiators.state == "heat" ||
        (radiators.state == "auto" && state != "heat")
      ) {
        state = radiators.state;
      }
    });
    return state;
  }

  __renderCar(car) {
    const state = car.state == "unknown" ? "off" : car.state;
    return this.__renderInfoCard(
      ICON_STATE_CAR[state],
      true,
      "info-icon-" + state,
    );
  }

  __renderInfoCard(icon, isIconPath = false, cls = "icon") {
    return html`
      <div class="svg-container">
        ${isIconPath ? renderSvgIcon(icon, cls) : icon}
      </div>
    `;
  }

  __renderDateCard() {
    return html`
      <base-card content-display="column" class="date-panel">
        <div class="rest row">${this.__renderTimeSensors()}</div>
        <div class="hour">${this.__getHour()}</div>
        <div class="date">${this.__getDate()}</div>
      </base-card>
    `;
  }

  __renderTimeSensors() {
    return this.config.time_sensors.map((sensor) => {
      if (sensor.type == "workday") {
        return this.__renderWorkdayStatus(sensor.entity);
      } else {
        return this.__renderSchoolStatus(sensor.entity);
      }
    });
  }

  __renderSchoolStatus(entity) {
    return renderSvgIcon(
      this.hass.states[entity].state == STATE_TIME_ON
        ? mdiAccountSchoolOutline
        : mdiHomeOutline,
    );
  }

  __renderWorkdayStatus(entity) {
    return renderSvgIcon(
      this.hass.states[entity].state == STATE_TIME_ON
        ? mdiBriefcaseOutline
        : mdiBriefcaseOffOutline,
    );
  }

  __getHour() {
    const options = {
      minimumIntegerDigits: 2,
      useGrouping: false,
    };
    return [
      this._date.getHours().toLocaleString("fr-FR", options),
      this._date.getMinutes().toLocaleString("fr-FR", options),
    ].join(":");
  }

  __getDate() {
    const options = {
      minimumIntegerDigits: 2,
      useGrouping: false,
    };
    const daysOfWeek = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return [
      [daysOfWeek[this._date.getDay()], ","].join(""),
      [
        this._date.getDate().toLocaleString("fr-FR", options),
        this._date.getMonth().toLocaleString("fr-FR", options),
        this._date.getFullYear().toLocaleString("fr-FR", options),
      ].join("."),
    ].join(" ");
  }
}

window.customElements.define("earth-card", EarthCard);
