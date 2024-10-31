import { LitElement, html, css } from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom elements
import "./action-card.js";
import "./info-card.js";
import "./people-info.js";
import "./sci-fi-card.js";
import "./toast-card.js";

// TODO remove/update
const SVG_PATH = "images/control_panel.svg";
const CONFIG = {
    "people": [
        "person.adrien",
        "person.virginie"
    ],
    "actions": [
        {
            "icon": "mdi:bell-ring-outline",
            "title": "Call kids",
            "tap_action": {
                "service": "automation.trigger",
                "service_data": {
                    "entity_id": "automation.call_kids"
                }
            }
        },
        {
            "icon": "mdi:door",
            "title": "Clean entry",
            "tap_action": {
                "service": "xiaomi_miio.vacuum_clean_segment",
                "service_data": {
                    "entity_id": "vacuum.dobby",
                    "segments": [
                        17
                    ]
                }
            }
        },
        {
            "icon": "mdi:broom",
            "title": "Clean daily",
            "tap_action": {
                "service": "xiaomi_miio.vacuum_clean_segment",
                "service_data": {
                    "entity_id": "vacuum.dobby",
                    "segments": [
                        17,
                        18
                    ]
                }
            }
        },
        {
            "icon": "mdi:silverware-fork-knife",
            "title": "Clean kitchen",
            "tap_action": {
                "service": "xiaomi_miio.vacuum_clean_segment",
                "service_data": {
                    "entity_id": "vacuum.dobby",
                    "segments": [
                        17,
                        18
                    ]
                }
            }
        }
    ],
    "info": [
        {
            "icon": "an icon",
            "title": "École",
            "entity": "entity",
            "secondary": "Il y a 1h",
            "value": "On"
        },
        {
            "icon": "an icon",
            "title": "Quantité pellet poêle",
            "secondary": "Il y a 1 heure",
            "value": "85%"
        },
        {
            "icon": "an icon",
            "title": "Sac pellet en stock",
            "secondary": "Il y a 12 heures",
            "value": "61"
        },
        {
            "icon": "an icon",
            "title": "Intermarché",
            "secondary": "E10",
            "value": "1.559 $"
        },
        {
            "icon": "an icon",
            "title": "Super U",
            "secondary": "E10",
            "value": "1.359 $"
        }
    ]
};
/*
- icon: mdi:umbrella-beach-outline
    title: École
    entity: binary_sensor.ecole_aujourdhui
  - icon: mdi:stove
    entity: sensor.clou_pellet_quantity
    unit: "%"
  - entity: counter.pellet_stock
  - icon: mdi:gas-station-outline
    entity: sensor.intermarche
    secondary: e10_maj
    value: e10_prix
  - icon: mdi:gas-station-outline
    entity: sensor.super_u
    secondary: e10_maj
    value: e10_prix
    */


// TODO Change path
import styles from '../css/custom.css' with { type: 'css' }; 

export class DashboardCard extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        --control-img-size: 150px;
      
        width: 100%;
        padding: 20px;
        background:
          radial-gradient(black 1px, transparent 2px),
          radial-gradient(black 1px, transparent 2px),
          linear-gradient(rgb(0, 0, 0) 2px, transparent 0),
          linear-gradient(45deg, transparent 18px, transparent 18px, var(--color-darkblue-opacity) 18px, var(--color-darkblue-opacity) 19px, transparent 19px, transparent 27px),
          linear-gradient(-45deg, transparent 18px, transparent 18px, var(--color-darkblue-opacity) 18px, var(--color-darkblue-opacity) 19px, transparent 19px, transparent 27px),
          rgb(0, 0, 0);
        background-size: 27px 27px, 27px 27px, 100% 3px, 27px 27px, 27px 27px;
          
        &>div {
          height: 100%;
        }
        .second-row {
          margin-top: 13px;
        }
        .control-img {
          width: var(--control-img-size);
          height: var(--control-img-size);
        }
        .people {
          align-self: center;
        }
        .actions {
          align-self: center;
          color: var(--action-color);
        }
      }`
  ];
  
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }
  
  // TODO : Remove
  constructor() {
    super();
    this.setConfig(CONFIG);
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
      <div class="column">
        <div class="row">
            <div class="control-img"><img src="${SVG_PATH}"></img></div>
            <div class="column grow-1 row-gap-bottom">
                <sci-fi-card type="normal">${this.__drawPeople()}</sci-fi-card>
                <sci-fi-card type="alert" style="margin-top: auto;">${this.__drawActions()}</sci-fi-card>
            </div>
            <div class="column row-gap grow-3">
                HOUR/WEATHER
            </div>
        </div>
        <div class="row column-gap grow-1 second-row">
            <sci-fi-card type="normal">${this.__drawinfo()}</sci-fi-card>
            <sci-fi-card type="normal" class="grow-1">HOUSE</sci-fi-card>
        </div>
      </div>
    `;
  }
  
  __drawPeople(){
    return html`
      <div class="row column-gap people">
        ${this.config.people.map((person) => {
            // TODO : img / firstName / location;
            return html`<people-info></people-info>`;
        })}
      </div>
    `;
  }
  
  __drawActions(){
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
  
  __actionTapped(e){
    const entity = this.config.actions[e.detail.id]
    const services = entity.tap_action.service.split('.');
    const toast = this.shadowRoot.querySelector("toast-card");
    // TODO : uncomment
    // this.hass.callService(services[0], services[1], entity.tap_action.service_data);
    toast.show('"'.concat(entity.title, '"', " action en cours"));
  }
  
  __drawinfo(){   
    return html`
        <div class="column row-gap">
            ${this.config.info.map((e) => {
                /* TODO
                const entity = this.hass.states[info.entity];
                const icon = info.icon || entity.attributes.icon;
                const title = info.title || entity.attributes.friendly_name;
                const secondary = info.secondary ? entity.attributes[info.secondary] : new Date(entity.last_updated).toLocaleString('fr-FR', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'})
                const value = info.value ? entity.attributes[info.value] : entity.state;
                const unit = info.unit || '';
    */          
                const icon = e.icon;
                const title = e.title;
                const secondary = e.secondary;
                const value = e.value;
                const unit = '';
                return html`<info-card 
                    icon="${icon}"
                    title="${title}"
                    secondary="${secondary}"
                    state="${value}"
                    unit="${unit}"
                ></info-card>`;
            })}
        </div>
    `;
  }
  
}

window.customElements.define('dashboard-card', DashboardCard);
