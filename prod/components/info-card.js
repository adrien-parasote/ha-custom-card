import { LitElement, html, css } from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom CSS
import styles from '/local/custom/css/custom.css' with { type: 'css' }; 

export class InfoCard extends LitElement {
  static styles = [
    styles,
    css`
    :host {
      .icon-container {
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    
        .icon {
          position: relative;
        }
      }
      .text-muted {
        padding: 5px;
        border-top: 1px solid var(--color-darkblue-opacity);
        font-size: var(--font-size-small);
        min-width: 100px;
        text-align: center;
      }
      .before, .after {
        border-top: 1px solid var(--color-darkblue-opacity);
        border-bottom: 1px solid var(--color-darkblue-opacity);
        width: 15px;
        content: "";
      }
      .before {
        border-left: 1px solid var(--color-darkblue-opacity);
      }
      .after {
        border-right: 1px solid var(--color-darkblue-opacity);
      }
      .info {
        margin: auto;
      }
      .info, .primary-info, .secondary-info {
        align-items: center;
        padding: 0;
      }
    }
    `
  ];
  
  static get properties() {
    return {
        icon: {style: String},
        title: {style: String},
        secondary: {style: String},
        state: {style: String},
        unit: {style: String}
    };
  }
  
  constructor() {
    super();  
    this.icon = this.icon ? this.icon : "mdi:cursor-default";
    this.title = this.title ? this.title : "Default title";
    this.secondary = this.secondary ? this.secondary : "Secondary";
    this.state = this.state ? this.state : "State";
    this.unit = this.unit ? this.unit : "";
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
                <div class="text-muted">${this.secondary}</div>
            </div>
            <span class="before"></span>
            <div class="column grow-1 info row-gap">
                <div class="primary-info">${this.title}</div>
                <div class="secondary-info">${this.state} ${this.unit}</div>
            </div>
            <span class="after"></span>
        </div>
    `;
  }
}

window.customElements.define('info-card', InfoCard);
