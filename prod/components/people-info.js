import {
  LitElement,
  html,
  css,
} from 'https://unpkg.com/lit-element@3.2.1/lit-element.js?module';

// Custom CSS
import styles from '/local/custom/css/custom.css' with {type: 'css'};

// Images
const DEFAULT_IMG = '/local/custom/images/people.png';

// Version
const VERSION = '1.0';

export class PeopleInfo extends LitElement {
  static styles = [
    styles,
    css`
      :host {
      }
      .avatar {
        border: 1px solid var(--color-darkblue);
        box-shadow: 0 0 5px 1px var(--color-darkblue);
        border-radius: 50%;
        display: inline-block;
        height: var(--icon-size);
        width: var(--icon-size);
        position: relative;
        align-items: center;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .avatar-info {
          align-self: center;
        }
      }
    `,
  ];

  static get properties() {
    return {
      img: {type: String},
      firstName: {type: String},
      location: {type: String},
    };
  }

  constructor() {
    super();
    this.img = this.img ? this.img : DEFAULT_IMG;
    this.firstName = this.firstName ? this.firstName : 'Punk';
    this.location = this.location ? this.location : 'Spaceship';
    console.info(
      `%cPEOPLE-CARD Version: ${VERSION}`,
      'color: rgb(105, 211, 251); font-weight: bold; background: black',
    );
  }

  render() {
    return html`
      <div class="row">
        <div class="avatar">
          <img src="${this.img}" />
        </div>
        <div class="avatar-info column">
          <div class="primary-info">${this.firstName}</div>
          <div class="secondary-info text-muted">${this.location}</div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('people-info', PeopleInfo);