import { LitElement, html, css } from "lit";

// Custom components import
import "./representation-bar.js";
import "./representation-circle.js";

// Custom CSS
import styles from "./common-styles.js";

// Version
import { INFO_CARD_VERSION } from "./config.js";
console.info(
  `%cINFO-CARD Version: ${INFO_CARD_VERSION}`,
  "color: rgb(105, 211, 251); font-weight: bold; background: black",
);

export class InfoCard extends LitElement {
  static styles = [
    styles,
    css`
      .icon-container {
        padding: 10px 5px 5px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .icon {
        position: relative;
        ha-icon {
          width: 30px !important;
          height: 30px !important;
        }
      }
      .text-muted {
        padding: 5px;
        border-top: 1px solid var(--color-darkblue);
        font-size: var(--font-size-small);
        min-width: 100px;
        text-align: center;
      }
      .content {
        margin: 5px 0;
      }
      .before,
      .after {
        margin: 5px 0;
        border-top: 1px solid var(--color-darkblue);
        border-bottom: 1px solid var(--color-darkblue);
        width: 15px;
        content: "";
      }
      .before {
        border-left: 1px solid var(--color-darkblue);
      }
      .after {
        border-right: 1px solid var(--color-darkblue);
      }
      .info {
        margin: auto;
      }
      .info,
      .primary-info,
      .secondary-info {
        align-items: center;
        text-align: center;
        padding: 0;
      }
      .title {
        padding: 0 5px 5px 5px;
        width: 130px;
      }
    `,
  ];

  static get properties() {
    return {
      icon: { type: String },
      title: { type: String },
      secondary: { type: String },
      state: { type: String },
      unit: { type: String },
      renderType: { type: String },
      text: { type: String },
      threshold: { type: Number },
    };
  }

  constructor() {
    super();
    this.icon = this.icon ? this.icon : "mdi:cursor-default";
    this.title = this.title ? this.title : "Default title";
    this.secondary = this.secondary ? this.secondary : "Secondary";
    this.state = this.state ? this.state : "State";
    this.unit = this.unit ? this.unit : "";
    this.renderType = this.renderType ? this.renderType : "default";
    this.text = this.text ? this.text : "";
  }

  render() {
    return html`
      <div class="row">
        <div class="column">
          <div class="icon-container">
            <div class="icon">
              <span class="corner-border-top"></span>
              <ha-icon icon="${this.icon}" style="padding:5px;"></ha-icon>
              <span class="corner-border-bottom"></span>
            </div>
          </div>
          <div class="primary-info title">${this.title}</div>
          <div class="text-muted grow-1">${this.secondary}</div>
        </div>
        <span class="before"></span>
        ${this.__renderInfo()}
        <span class="after"></span>
      </div>
    `;
  }

  __renderInfo() {
    switch (this.renderType) {
      case "text":
        return html`<div class="content column grow-1 info">
          <div class="primary-info">${this.text}</div>
          <div class="secondary-info">${this.state}</div>
        </div>`;
      case "graph":
        const text = this.state + " " + this.unit;
        return html`
          <representation-bar
            class="content column grow-1"
            text="${text}"
            val="${parseFloat(this.state)}"
            threshold="${this.threshold}"
            size="70px"
          ></representation-bar>
        `;
      case "circle":
        return html`
          <representation-circle
            class="content column grow-1"
            on="${this.state}"
            size="70px"
          ></representation-circle>
        `;
      default:
        return html`<div class="content column grow-1 info">
          <div class="secondary-info">${this.state}</div>
          <div class="secondary-info">${this.unit}</div>
        </div>`;
    }
  }
}

window.customElements.define("info-card", InfoCard);