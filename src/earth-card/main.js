import { LitElement, html, css } from "lit";

import "./../utils/base-card.js";
import { renderSvgIcon } from "./../utils/icon-svg.js";
import animatedEarth from "./svg/earth.js";
import { stoveCool, stoveHeat, stoveOff } from "./svg/stove.js";
import {
  mdiBriefcaseOutline,
  mdiBriefcaseOffOutline,
  mdiHomeOutline,
  mdiAccountSchoolOutline,
  mdiCarElectricOutline,
  mdiCarOutline,
  mdiLightbulbOutline,
  mdiLightbulbOnOutline,
  mdiRadiatorDisabled,
  mdiRadiator,
  mdiRadiatorOff,
} from "@mdi/js";

import { VERSION } from "./config.js";

// Custom CSS
import styles from "../common-styles.js";

// Constant
const STATE_WORKDAY_ON = "on";
const STATE_SCHOOL_ON = "on";
const ICON_STATE_CLIMATE = {
  heat: mdiRadiator,
  off: mdiRadiatorOff,
  auto: mdiRadiatorDisabled,
};
const ICON_STATE_STOVE = {
  off: stoveOff,
  heat: stoveHeat,
  cool: stoveCool,
};
const ICON_STATE_CAR = {
  off: mdiCarOutline,
  on: mdiCarElectricOutline,
};
const ICON_STATE_LIGHT = {
  off: mdiLightbulbOutline,
  on: mdiLightbulbOnOutline,
};

export class EarthCard extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        :host {
          --state-icon-size: 15px;
        }
        .planet-svg-container {
          width: 125px;
          height: 125px;
          svg {
            stroke: var(--secondary-color);
          }
          .ring {
            stroke-miterlimit: 10;
            fill: none;
            stroke-width: 5;
            filter: url("#drop-shadow-filter");
          }
          .stroke-ring {
            stroke-dasharray: 12.1947, 12.1947, 12.1947, 12.1947, 12.1947,
              12.1947;
          }
          .inner-ring {
            stroke-dasharray: 50, 90, 200, 30, 40, 0;
          }
          .outer-ring {
            stroke-linecap: square;
            stroke-dasharray: 120, 20, 110, 20, 140;
          }
          .outer-thin-ring {
            stroke-linecap: square;
          }
          .planet {
            stroke-width: 5;
            fill: none;
          }
          .path {
            stroke: var(--secondary-color);
            stroke-width: 2px;
            fill: none;
            filter: url("#drop-shadow-filter");
          }
          .details {
            stroke-width: 6px;
          }
          .bubble {
            fill: white;
            stroke-width: 0;
          }
        }

        .date-panel {
          .hour {
            font-size: 50px;
          }
          .date,
          .rest {
            color: var(--color-muted);
            text-shadow: none;
          }
          .rest {
            align-self: end;
            gap: 5px;
          }
          .icon {
            fill: var(--secondary-color);
            width: var(--state-icon-size);
            height: var(--state-icon-size);
          }
        }

        .info-panel {
          align-self: end;
          svg {
            stroke: var(--secondary-color);
          }
          .svg-container {
            width: 20px;
            height: 20px;
          }
          .info-icon-off {
            stroke: none;
            fill: var(--secondary-color);
          }
          .info-icon-on {
            stroke: none;
            fill: var(--color-active-icon);
          }
          .info-card {
            font-size: var(--font-size-small);
            width: fit-content;
            align-items: center;
            margin: 2.5px;
          }
        }
      `,
    ];
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
      if (!entity.type)
        throw new Error(
          "You need to define an entity <type> for each info sensors",
        );
      if (!["car", "stove", "light", "radiators"].includes(entity.type))
        throw new Error(
          "Info sensor entity <type> must be car or stove or light or radiators",
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
        ${this.__renderInfos()}
      </div>
    `;
  }

  __renderInfos() {
    return html`
      <base-card
        content-display="column"
        align-item="center"
        height="80px"
        width="100px"
        wrap
        class="info-panel"
      >
        ${this.__renderInfo()}
      </base-card>
    `;
  }

  __renderInfo() {
    return this.config.info_sensors.map((sensor) => {
      const entity = this.hass.states[sensor.entity];
      if (sensor.type == "stove")
        return this.__renderStove(this.hass.states[sensor.entity]);
      if (sensor.type == "car")
        return this.__renderCar(this.hass.states[sensor.entity]);
      if (sensor.type == "light")
        return this.__renderLight(this.hass.states[sensor.entity]);
      if (sensor.type == "radiators")
        return this.__renderRadiators(sensor.entities);
    });
  }

  __renderRadiators(radiators) {
    const globalState = this.__getRadiatorsGlobalState(radiators);
    return this.__renderInfoCard(
      ICON_STATE_CLIMATE[globalState],
      "Radiateurs",
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

  __renderLight(light) {
    return this.__renderInfoCard(
      ICON_STATE_LIGHT[light.state],
      light.attributes.friendly_name,
      true,
      "info-icon-" + light.state,
    );
  }

  __renderCar(car) {
    const state = car.state == "unknown" ? "off" : car.state;
    return this.__renderInfoCard(
      ICON_STATE_CAR[state],
      car.attributes.friendly_name,
      true,
      "info-icon-" + state,
    );
  }

  __renderStove(stove) {
    return this.__renderInfoCard(
      ICON_STATE_STOVE[stove.state],
      stove.attributes.friendly_name,
    );
  }

  __renderInfoCard(icon, title, isIconPath = false, cls = "icon") {
    return html`
      <div class="column info-card">
        <div class="svg-container">
          ${isIconPath ? renderSvgIcon(icon, cls) : icon}
        </div>
        <div>${title}</div>
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
      this.hass.states[entity].state == STATE_SCHOOL_ON
        ? mdiAccountSchoolOutline
        : mdiHomeOutline,
    );
  }

  __renderWorkdayStatus(entity) {
    return renderSvgIcon(
      this.hass.states[entity].state == STATE_WORKDAY_ON
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
