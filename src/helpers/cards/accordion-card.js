import { LitElement, html, css } from "lit";
import styles from "../styles/common-styles.js";

export class AccordionCard extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        .accordion {
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
          content: "❯";
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
      title: { type: String },
      open: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.title = this.title ? this.title : null;
    this.open = this.open ? this.open : false;
  }

  render() {
    return html`
      <section class="accordion">
        <div class="tab">
          <input
            type="checkbox"
            name="accordion-1"
            id="cb"
            ?checked=${this.open}
          />
          <label for="cb" class="label">${this.title}</label>
          <div class="content">
            <div><slot></slot></div>
          </div>
        </div>
      </section>
    `;
  }
}

window.customElements.get("sci-fi-accordion-card") ||
  window.customElements.define("sci-fi-accordion-card", AccordionCard);
