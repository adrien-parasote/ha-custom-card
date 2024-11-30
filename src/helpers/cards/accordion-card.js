import {LitElement, css, html} from 'lit';

import styles from '../styles/common-styles.js';
import {getIcon} from '../styles/icon-svg.js';

export class AccordionCard extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        .accordion {
          flex: 1;
          border: var(--card-border-width) solid var(--primary-color);
          overflow: hidden;
        }
        .tab {
          position: relative;
        }
        .tab input {
          position: absolute;
          opacity: 0;
          z-index: -1;
        }
        .content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.35s;
        }
        .content > div {
          padding: 10px;
          margin: 0;
        }
        .tab input:checked ~ .content {
          max-height: fit-content;
        }
        .label {
          display: flex;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          background-color: var(--secondary-color-opacity);
          cursor: pointer;
          justify-content: space-between;
          padding: 10px;
          text-transform: uppercase;
          font-weight: bold;
        }
        .label::after {
          content: '❯';
          width: 1em;
          height: 1em;
          text-align: center;
          transform: rotate(90deg);
          transition: all 0.35s;
        }
        .tab input:checked + .label::after {
          transform: rotate(270deg);
        }
        .tab input:not(:checked) + .label:hover::after {
          animation: bounce 0.5s infinite;
          -webkit-animation-name: bounce 0.5s infinite;
        }
        .delete {
          margin-top: 6px;
        }

        .svg-container {
          width: var(--icon-size-xsmall);
          height: var(--icon-size-xsmall);
          fill: var(--primary-color);
        }
        @-webkit-keyframes bounce {
          25% {
            transform: rotate(90deg) translate(0.25rem);
          }
          75% {
            transform: rotate(90deg) translate(-0.25rem);
          }
        }

        @keyframes bounce {
          25% {
            transform: rotate(90deg) translate(0.25rem);
          }
          75% {
            transform: rotate(90deg) translate(-0.25rem);
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      elementId: {type: String, attribute: 'element-id'},
      title: {type: String},
      open: {type: Boolean},
      icon: {type: String},
      deletable: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.elementId = this.elementId ? this.elementId : 'cb';
    this.title = this.title ? this.title : null;
    this.open = this.open ? this.open : false;
    this.deletable = this.deletable ? this.deletable : false;
    this.icon = this.icon ? this.icon : null;
  }

  render() {
    return html`
      <div class="row column-gap">
        <section class="accordion">
          <div class="tab">
            <input
              type="checkbox"
              name="accordion-1"
              id="${this.elementId}"
              ?checked=${this.open}
            />
            <label for="${this.elementId}" class="label">
              <div class="row column-gap">
                ${this.icon ? this.__renderMainIcon() : ''}
                <div>${this.title}</div>
              </div>
            </label>
            <div class="content">
              <div><slot></slot></div>
            </div>
          </div>
        </section>
        ${this.deletable ? this.__renderDeleteIcon() : ''}
      </div>
    `;
  }

  __renderMainIcon() {
    return html`<div class="svg-container">${getIcon(this.icon)}</div>`;
  }

  __renderDeleteIcon() {
    return html`
      <div class="delete">
        <sci-fi-button
          icon-name="mdiDelete"
          @button-click="${this._delete}"
        ></sci-fi-button>
      </div>
    `;
  }

  _delete(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('accordion-delete', {
        bubbles: true,
        composed: true,
        detail: {
          elementId: this.elementId,
        },
      })
    );
  }
}

window.customElements.get('sci-fi-accordion-card') ||
  window.customElements.define('sci-fi-accordion-card', AccordionCard);
