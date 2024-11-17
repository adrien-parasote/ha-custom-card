import { LitElement, html, css } from "lit";

// Custom CSS
import styles from "./common-styles.js";

// Version
import { HOUSE_CARD_VERSION } from "./config.js";
console.info(
  `%cHOUSE-CARD Version: ${HOUSE_CARD_VERSION}`,
  "color: rgb(105, 211, 251); font-weight: bold; background: black",
);

export class HouseCard extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        height: calc(100% - 30px);
        align-items: center;
      }
      .svg-container {
        width: 500px;
      }
      path {
        stroke: var(--color-darkblue);
        stroke-width: 2px;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }
      .first-floor:hover,
      .ground:hover {
        cursor: pointer;
        .lighting path {
          fill: var(--color-darkyellow-opacity);
        }
      }
      .background-no-stroke {
        stroke-width: 0;
        fill: transparent;
      }
    `,
  ];

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="svg-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 520 520"
          style="fill:red;"
        >
          <g transform="matrix(1, 0, 0, 1, 162, 31)">
            <path d="M -15 135 L 170 -25 L 355 135" />
            <path d="M 58 71 L 58 21 L 88 21 L 88 43" />
          </g>
          <g class="first-floor" transform="matrix(1, 0, 0, 1, 162, 31)">
            <g class="lighting">
              <g transform="matrix(1, 0, 0, 1, 20, 0)">
                <path d="M 10 205 L 10 155 L 35 155 L 35 205 L 10 205 Z" />
                <path d="M 38 205 L 38 155 L 88 155 L 88 205 L 38 205 Z" />
                <path d="M 91 205 L 91 155 L 116 155 L 116 205 L 91 205 Z" />
              </g>
              <g transform="matrix(1, 0, 0, 1, 195, 0)">
                <path d="M 10 205 L 10 155 L 35 155 L 35 205 L 10 205 Z" />
                <path d="M 38 205 L 38 155 L 88 155 L 88 205 L 38 205 Z" />
                <path d="M 91 205 L 91 155 L 116 155 L 116 205 L 91 205 Z" />
              </g>
            </g>
            <g>
              <path d="M 0 125 L 340 125 L 340 245" />
              <path d="M 0 125 L 0 245" />
              <path
                class="background-no-stroke"
                d="M 0 125 L 340 125 L 340 245 L 0 245 Z"
              />
            </g>
          </g>
          <g class="ground">
            <g class="lighting" transform="matrix(1, 0, 0, 1, 162, 141)">
              <g>
                <path d="M 10 205 L 10 155 L 35 155 L 35 205 L 10 205 Z" />
                <path d="M 38 205 L 38 155 L 88 155 L 88 205 L 38 205 Z" />
                <path d="M 91 205 L 91 155 L 116 155 L 116 205 L 91 205 Z" />
              </g>
              <g transform="matrix(1, 0, 0, 1, 215, 0)">
                <path d="M 10 205 L 10 155 L 35 155 L 35 205 L 10 205 Z" />
                <path d="M 38 205 L 38 155 L 88 155 L 88 205 L 38 205 Z" />
                <path d="M 91 205 L 91 155 L 116 155 L 116 205 L 91 205 Z" />
              </g>
              <path d="M 137 155 L 177 155 L 177 255 L 137 255 L 137 155 Z" />
              <path d="M 180 155 L 205 155 L 205 255 L 180 255 L 180 155 Z" />
            </g>
            <g transform="matrix(1, 0, 0, 1, 162, 151)">
              <path
                style="fill:transparent;"
                d="M 0 125 L 0 245 L 340 245 L 340 125"
              />
            </g>
          </g>
          <g class="cellar" transform="matrix(1, 0, 0, 1, 162, 271)">
            <path d="M 0 125 L 0 245 L 340 245 L 340 125 Z" />
          </g>
          <g class="outside" transform="matrix(1, 0, 0, 1, 162, 31)">
            <path d="M -160 365 L 0 365" />
            <path d="M -120 365 L -120 250" />
            <path d="M 0 240 L -125 250" />
          </g>
        </svg>
      </div>
    `;
  }
}

window.customElements.define("house-card", HouseCard);
