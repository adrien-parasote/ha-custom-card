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

  setConfig(config) {
    if (!config.workday_sensor) {
      throw new Error("You need to define a workday sensor");
    }
    if (!config.school_sensor) {
      throw new Error("You need to define a school sensor");
    }
    if (!config.stove) {
      throw new Error("You need to define a stove climate entity");
    }
    if (!config.car) {
      throw new Error("You need to define a car switch sensor");
    }
    if (!config.light) {
      throw new Error("You need to define light entity");
    }
    if (!config.radiators) {
      throw new Error("You need to define radiators entities");
    }

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
        ${this.__renderInfo()}
      </div>
    `;
  }

  __renderInfo() {
    return html`
      <base-card
        content-display="column"
        align-item="center"
        height="80px"
        width="100px"
        wrap
        class="info-panel"
      >
        ${this.__renderCar()} ${this.__renderLights()}
        ${this.__renderRadiators()} ${this.__renderStove()}
      </base-card>
    `;
  }

  __renderRadiators() {
    const globalState = this.__getRadiatorsGlobalState();
    return this.__renderInfoCard(
      ICON_STATE_CLIMATE[globalState],
      "Radiateurs",
      true,
      "info-icon-" + (globalState == "heat" ? "on" : "off"),
    );
  }

  __getRadiatorsGlobalState() {
    let state = "off";
    this.config.radiators.map((entity) => {
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

  __renderLights() {
    const light = this.hass.states[this.config.light];
    return this.__renderInfoCard(
      ICON_STATE_LIGHT[light.state],
      light.attributes.friendly_name,
      true,
      "info-icon-" + light.state,
    );
  }

  __renderCar() {
    const car = this.hass.states[this.config.car];
    const state = car.state == "unknown" ? "off" : car.state;
    return this.__renderInfoCard(
      ICON_STATE_CAR[state],
      car.attributes.friendly_name,
      true,
      "info-icon-" + state,
    );
  }

  __renderStove() {
    const stove = this.hass.states[this.config.stove];
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
        <div class="rest row">
          ${this.__renderSchoolStatus()} ${this.__renderWorkdayStatus()}
        </div>
        <div class="hour">${this.__getHour()}</div>
        <div class="date">${this.__getDate()}</div>
      </base-card>
    `;
  }
  __renderSchoolStatus() {
    return renderSvgIcon(
      this.hass.states[this.config.school_sensor].state == STATE_SCHOOL_ON
        ? mdiAccountSchoolOutline
        : mdiHomeOutline,
    );
  }

  __renderWorkdayStatus() {
    return renderSvgIcon(
      this.hass.states[this.config.workday_sensor].state == STATE_WORKDAY_ON
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
