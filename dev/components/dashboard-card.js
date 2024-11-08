import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom components import
import "./action-card.js";
import "./info-card.js";
import "./people-info.js";
import "./sci-fi-card.js";
import "./toast-card.js";
import "./weather-clock-card.js";

import { hass, config } from "./dev-config.js";

// Custom CSS
import styles from "./common-styles.js";

// Images
const SVG_PATH = "/images/control_panel.svg";

// Version
const VERSION = "DEV";

export class DashboardCard extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        :host {
          --control-img-size: 150px;

          width: 100%;
          padding: 20px;
          background: radial-gradient(black 1px, transparent 2px),
            radial-gradient(black 1px, transparent 2px),
            linear-gradient(rgb(0, 0, 0) 2px, transparent 0),
            linear-gradient(
              45deg,
              transparent 18px,
              transparent 18px,
              var(--color-darkblue-opacity) 18px,
              var(--color-darkblue-opacity) 19px,
              transparent 19px,
              transparent 27px
            ),
            linear-gradient(
              -45deg,
              transparent 18px,
              transparent 18px,
              var(--color-darkblue-opacity) 18px,
              var(--color-darkblue-opacity) 19px,
              transparent 19px,
              transparent 27px
            ),
            rgb(0, 0, 0);
          background-size:
            27px 27px,
            27px 27px,
            100% 3px,
            27px 27px,
            27px 27px;
        }
        .content {
          height: 100%;
        }
        .second-row {
          margin-top: 13px;
        }
        .control-img {
          width: var(--control-img-size);
          min-width: var(--control-img-size);
          max-width: var(--control-img-size);
          height: var(--control-img-size);
        }
        .info-content {
          padding-top: 20px;
          border-left: var(--card-border-width) solid var(--color-darkblue);
        }
        .actions {
          align-self: center;
          color: var(--action-color);
        }
        .weather-clock {
          justify-content: center;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.hass = hass;
    this.setConfig(config);
    console.info(
      `%cDASHBOARD-CARD Version: ${VERSION}`,
      "color: rgb(105, 211, 251); font-weight: bold; background: black",
    );
  }

  setConfig(config) {
    if (!config.people) {
      throw new Error("You need to define people");
    }
    if (!config.actions) {
      throw new Error("You need to define actions");
    }
    if (!config.info) {
      throw new Error("You need to define info");
    }
    if (!config.work_day) {
      throw new Error("You need to define a workday entity");
    }
    if (!config.sun) {
      throw new Error("You need to define a sun entity");
    }
    if (!config.weather) {
      throw new Error("You need to define a weather entity");
    }
    this.config = config;
  }

  getCardSize() {
    return 1;
  }

  render() {
    return html`
      <toast-card></toast-card>
      <div class="content column">
        <div class="row">
          <div class="control-img">
            <object type="image/svg+xml" data="${SVG_PATH}"></object>
          </div>
          <div class="column grow-1 row-gap-bottom">
            <sci-fi-card type="normal"> ${this.__drawPeople()}</sci-fi-card>
            <sci-fi-card type="alert" style="margin-top: auto;">
              ${this.__drawActions()}
            </sci-fi-card>
          </div>
          <div class="row column-gap grow-3 weather-clock">
            ${this.__drawWeatherClock()}
          </div>
        </div>
        <div class="row column-gap grow-1 second-row">
          <!--<sci-fi-card type="normal">-->
          ${this.__drawinfo()}
          <!--</sci-fi-card>-->
          <div class="grow-1">house</div>
        </div>
      </div>
    `;
  }

  __drawPeople() {
    return html`
      <div class="row column-gap">
        ${this.config.people.map((personEntity) => {
          const person = this.hass.states[personEntity];
          return html`<people-info
            img="${person.attributes.entity_picture}"
            firstName="${person.attributes.friendly_name}"
            location="${person.state}"
          ></people-info>`;
        })}
      </div>
    `;
  }

  __drawActions() {
    return html`
      <div class="row column-gap actions">
        ${this.config.actions.map((action, id) => {
          return html`<action-card
            id="${id}"
            icon="${action.icon}"
            title="${action.title}"
            @action-tapped="${this.__actionTapped}"
          ></action-card>`;
        })}
      </div>
    `;
  }

  __actionTapped(e) {
    const entity = this.config.actions[e.detail.id];
    const services = entity.tap_action.service.split(".");
    const toast = this.shadowRoot.querySelector("toast-card");
    this.hass.callService(
      services[0],
      services[1],
      entity.tap_action.service_data,
    );
    toast.show('"'.concat(entity.title, '"', " action en cours"));
  }

  __drawinfo() {
    return html`
      <div class="column info-content">
        ${this.config.info.map((info) => {
          const entity = this.hass.states[info.entity];
          const data = info.data ? info.data : {};
          return html`<info-card
            icon="${info.icon || entity.attributes.icon}"
            title="${info.title || entity.attributes.friendly_name}"
            secondary="${info.secondary
              ? entity.attributes[info.secondary]
              : new Date(entity.last_updated).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  hour12: false,
                  minute: "2-digit",
                  second: "2-digit",
                })}"
            state="${data.value
              ? entity.attributes[info.data.value]
              : entity.state}"
            unit="${data.unit ? data.unit : ""}"
            renderType="${data.render_type ? data.render_type : "default"}"
            text="${data.text ? data.text : ""}"
            threshold="${data.threshold ? data.threshold : 0.4}"
          ></info-card>`;
        })}
      </div>
    `;
  }

  __isDay() {
    return this.hass.states[this.config.sun].state == "above_horizon"? "day" : "night";
  }

  __drawWeatherClock() {
    return html`
        <weather-clock-card
          work="${this.hass.states[this.config.work_day].state}"
          dayType="${this.__isDay()}"
          weather="${this.hass.states[this.config.weather].state}"
          temperature="${this.hass.states[this.config.weather].attributes.temperature}"
        ></weather-clock-card>
    `;
  }
}

window.customElements.define("dashboard-card", DashboardCard);
