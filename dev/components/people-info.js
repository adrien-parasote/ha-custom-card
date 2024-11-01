import {LitElement, html, css} from 'lit';

import styles from '../css/custom.css' with {type: 'css'};

const DEFAULT_IMG = '/dev/images/people.png';

const VERSION = 'DEV';
console.info(
  `%cPEOPLE-INFO Version: ${VERSION}`,
  'color: rgb(105, 211, 251); font-weight: bold; background: black',
);

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
        width: v.ar(--icon-size);
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
