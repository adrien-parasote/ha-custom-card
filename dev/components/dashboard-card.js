import { LitElement, html, css } from "lit";

const VERSION = "DEV";
const SVG_PATH = "/dev/images/control_panel.svg";
const CONFIG = {
  people: ["person.adrien", "person.virginie"],
  actions: [
    {
      icon: "mdi:bell-ring-outline",
      title: "Call kids",
      tap_action: {
        service: "automation.trigger",
        service_data: {
          entity_id: "automation.call_kids",
        },
      },
    },
    {
      icon: "mdi:door",
      title: "Clean entry",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17],
        },
      },
    },
    {
      icon: "mdi:broom",
      title: "Clean daily",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17, 18],
        },
      },
    },
    {
      icon: "mdi:silverware-fork-knife",
      title: "Clean kitchen",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17, 18],
        },
      },
    },
  ],
  info: [
    {
      icon: "an icon",
      title: "École",
      entity: "entity",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "on",
        render_type: "circle"
      },
    },
    {
      icon: "an icon",
      title: "Quantité pellet poêle",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "85",
        unit: "%",
        render_type: "graph",
      },
    },
    {
      icon: "an icon",
      title: "Sac pellet en stock",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "40",
        unit: "sac",
        threshold: 0.2,
        render_type: "graph",
      },
    },
    {
      icon: "an icon",
      title: "Intermarché",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "1.559 $",
        text: "E10",
        render_type: "text",
      },
    },
    {
      icon: "an icon",
      title: "Super U",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "1.559 $",
        text: "E10",
        render_type: "text",
      },
    },
  ],
};

import styles from "./common-styles.js";

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
        object {
          color-scheme: auto;
        }
        .people {
          align-self: center;
        }
        .actions {
          align-self: center;
          color: var(--action-color);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.setConfig(CONFIG);
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
            <sci-fi-card type="normal">${this.__drawPeople()}</sci-fi-card>
            <sci-fi-card type="alert" style="margin-top: auto;"
              >${this.__drawActions()}</sci-fi-card
            >
          </div>
          <div class="column row-gap grow-3">HOUR/WEATHER</div>
        </div>
        <div class="row column-gap grow-1 second-row">
          <sci-fi-card type="normal">${this.__drawinfo()}</sci-fi-card>
          <div class="grow-1">house</div>
        </div>
      </div>
    `;
  }

  __drawPeople() {
    return html`
      <div class="row column-gap people">
        ${this.config.people.map((person) => {
          // TODO : img / firstName / location;
          return html`<people-info></people-info>`;
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
    toast.show('"'.concat(entity.title, '"', " action en cours"));
  }

  __drawinfo() {
    return html`
      <div class="column row-gap">
        ${this.config.info.map((e) => {
          return html`<info-card
            icon="${e.icon}"
            title="${e.title}"
            secondary="${e.secondary}"
            state="${e.data.value}"
            unit="${e.data.unit ? e.data.unit : ""}"
            renderType="${e.data.render_type ? e.data.render_type : "default"}"
            text="${e.data.text ? e.data.text : ""}"
            threshold="${e.data.threshold ? e.data.threshold : 0.4}"
          ></info-card>`;
        })}
      </div>
    `;
  }
}

window.customElements.define("dashboard-card", DashboardCard);
