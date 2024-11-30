import {LitElement, css, html} from 'lit';

import styles from '../../helpers/styles/common-styles.js';

export class SciFiCard extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        .card {
          position: relative;
          padding: 5px;
          justify-content: center;
        }
        .card-content {
          padding: 5px;
        }
        .card-wrap {
          padding: 5px;
        }
        .corner-border-top:before,
        .corner-border-top:after,
        .corner-border-bottom:before,
        .corner-border-bottom:after {
          border-style: solid;
          border-width: 0;
          border-color: var(--secondary-color);
          content: '';
          height: 10px;
          position: absolute;
          width: 10px;
        }
        .corner-border-top::before {
          border-left-width: var(--card-border-width);
          border-top-width: var(--card-border-width);
          left: 0;
          top: -1px;
        }
        .corner-border-top::after {
          border-right-width: var(--card-border-width);
          border-top-width: var(--card-border-width);
          right: 0;
          top: -1px;
        }
        .corner-border-bottom::before {
          border-bottom-width: var(--card-border-width);
          border-left-width: var(--card-border-width);
          bottom: -1px;
          left: 0;
        }
        .corner-border-bottom::after {
          border-bottom-width: var(--card-border-width);
          border-right-width: var(--card-border-width);
          bottom: -1px;
          right: 0;
        }
        .card-title {
          font-size: var(--font-size-title);
          font-weight: bold;
          padding-left: 5px;
          margin-bottom: 10px;
          text-transform: capitalize;
        }
      `,
    ];
  }

  static get properties() {
    return {
      contentDisplay: {type: String, attribute: 'content-display'},
      gap: {type: Boolean},
      title: {type: String},
      wrap: {type: Boolean},
      width: {type: String},
      height: {type: String},
      alignItem: {type: String, attribute: 'align-item'},
      noPadding: {type: Boolean, attribute: 'no-padding'},
    };
  }

  constructor() {
    super();
    this.contentDisplay =
      this.contentDisplay && ['row', 'column'].includes(this.contentDisplay)
        ? this.contentDisplay
        : 'row';
    this.gap = this.gap ? true : false;
    this.wrap = this.wrap ? true : false;
    this.noPadding = this.noPadding ? true : false;
    this.width = this.width ? this.width : 'inherit';
    this.height = this.height ? this.height : 'inherit';
    this.alignItem = this.alignItem ? this.alignItem : 'unset';
    this.title = this.title ? this.title : null;
  }

  render() {
    const display = {
      row: {
        true: 'row column-gap row-gap',
        false: 'row',
      },
      column: {
        true: 'column column-gap row-gap',
        false: 'column',
      },
      wrap: {
        true: 'flex-wrap',
        false: '',
      },
    };
    return html`
      <div
        class="column card"
        style="width: ${this.width};height: ${this.height}"
      >
        <span class="corner-border-top"></span>
        <div class="${!this.title ? '' : 'card-title'}">
          ${!this.title ? '' : this.title}
        </div>
        <div
          class="
          ${this.noPadding ? '' : 'card-content'}
          ${display[this.contentDisplay][this.gap]} 
          ${display['wrap'][this.wrap]}"
          style="align-items: ${this.alignItem}"
        >
          <slot></slot>
        </div>
        <span class="corner-border-bottom"></span>
      </div>
    `;
  }
}

window.customElements.get('sci-fi-card') ||
  window.customElements.define('sci-fi-card', SciFiCard);
