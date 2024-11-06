import { LitElement, html, css } from "lit";

// Custom CSS
import styles from "./common-styles.js";

// Version
const VERSION = "DEV";
console.info(
  `%cCIRCLE-SVG Version: ${VERSION}`,
  "color: rgb(105, 211, 251); font-weight: bold; background: black",
);

export class WeatherClockCard extends LitElement {
  static styles = [
    styles,
    css`
      .svg-container {
        width: 150px;
        height: 150px;
      }
      svg {
        stroke: var(--color-darkblue);
      }
      .ring {
        stroke-miterlimit: 10;
        fill: none;
        stroke-width: 5;
        filter: url("#drop-shadow-filter-lightblue");
      }
      .stroke-ring {
        stroke-dasharray: 12.1947, 12.1947, 12.1947, 12.1947, 12.1947, 12.1947;
      }
      .inner-ring {
        stroke-dasharray: 50, 90, 200, 30, 40, 0;
      }
      .outer-ring {
        stroke-linecap: square;
        stroke-dasharray: 120, 20, 110, 20, 140;
      }
      .outer-thin-ring {
        stroke-linecap: square;
      }
      .planet {
        stroke-width: 5;
        fill: none;
      }
      .path {
        stroke: var(--color-darkblue);
        stroke-width: 2px;
        fill: none;
        filter: url("#drop-shadow-filter-darkblue");
      }
      .bubble {
        fill: white;
        stroke-width: 0;
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
      <div class="row">
        <div>CLOCK</div>
        <div class="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            style="fill:none;"
            width="100%"
          >
            <defs>
              <filter
                id="drop-shadow-filter-darkblue"
                color-interpolation-filters="sRGB"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation="5"
                ></feGaussianBlur>
                <feOffset dx="0" dy="0"></feOffset>
                <feComponentTransfer result="offsetblur">
                  <feFuncA id="spread-ctrl" type="linear" slope="2"></feFuncA>
                </feComponentTransfer>
                <feFlood flood-color="var(--color-darkblue)"></feFlood>
                <feComposite in2="offsetblur" operator="in"></feComposite>
                <feMerge>
                  <feMergeNode></feMergeNode>
                  <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
              </filter>
              <filter
                id="drop-shadow-filter-lightblue"
                color-interpolation-filters="sRGB"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation="5"
                ></feGaussianBlur>
                <feOffset dx="0" dy="0"></feOffset>
                <feComponentTransfer result="offsetblur">
                  <feFuncA id="spread-ctrl" type="linear" slope="2"></feFuncA>
                </feComponentTransfer>
                <feFlood flood-color="var(--color-darkblue)"></feFlood>
                <feComposite in2="offsetblur" operator="in"></feComposite>
                <feMerge>
                  <feMergeNode></feMergeNode>
                  <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
              </filter>
            </defs>
            <g class="planet" transform="translate(290 290) scale(2)">
              <!-- Planet -->
              <path
                id="p1"
                class="path"
                d="M75,105a30,100 0 1,0 60,0a30,100 0 1,0 -60,0"
              />
              <circle class="bubble" cx="0" cy="0" r="3">
                <animateMotion
                  attributeName="motion"
                  attributeType="XML"
                  additive="sum"
                  dur="2s"
                  repeatCount="indefinite"
                >
                  <mpath xlink:href="#p1" />
                </animateMotion>
              </circle>
              <path
                id="p2"
                class="path"
                d="M35,105a70,100 0 1,0 140,0a70,100 0 1,0 -140,0"
              />
              <circle class="bubble" cx="0" cy="0" r="3">
                <animateMotion
                  attributeName="motion"
                  attributeType="XML"
                  additive="sum"
                  dur="3s"
                  repeatCount="indefinite"
                >
                  <mpath xlink:href="#p2" />
                </animateMotion>
              </circle>
              <path
                id="p3"
                class="path"
                d="M15,105a90,100 0 1,0 180,0a90,100 0 1,0 -180,0"
              />
              <circle class="bubble" cx="0" cy="0" r="3">
                <animateMotion
                  attributeName="motion"
                  attributeType="XML"
                  additive="sum"
                  dur="6s"
                  repeatCount="indefinite"
                >
                  <mpath xlink:href="#p3" />
                </animateMotion>
              </circle>
              <path
                id="p4"
                class="path"
                d="M5,105a100,30 0 1,0 200,0a100,30 0 1,0 -200,0"
              />
              <circle class="bubble" cx="0" cy="0" r="3">
                <animateMotion
                  attributeName="motion"
                  attributeType="XML"
                  additive="sum"
                  dur="2s"
                  repeatCount="indefinite"
                >
                  <mpath xlink:href="#p4" />
                </animateMotion>
              </circle>
              <path
                id="p5"
                class="path"
                d="M5,105a100,70 0 1,0 200,0a100,70 0 1,0 -200,0"
              />
              <circle class="bubble" cx="0" cy="0" r="3">
                <animateMotion
                  attributeName="motion"
                  attributeType="XML"
                  additive="sum"
                  dur="3s"
                  repeatCount="indefinite"
                >
                  <mpath xlink:href="#p5" />
                </animateMotion>
              </circle>
              <path
                id="p6"
                class="path"
                d="M5,105a100,90 0 1,0 200,0a100,90 0 1,0 -200,0"
              />
              <circle class="bubble" cx="0" cy="0" r="3">
                <animateMotion
                  attributeName="motion"
                  attributeType="XML"
                  additive="sum"
                  dur="5s"
                  repeatCount="indefinite"
                >
                  <mpath xlink:href="#p6" />
                </animateMotion>
              </circle>
            </g>

            <g class="ring">
              <!-- Stroke ring -->
              <circle class="stroke-ring" cx="500" cy="500" r="340">
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 500 500"
                  to="360 500 500"
                  dur="100s"
                  repeatCount="indefinite"
                />
              </circle>
              <!-- Inner ring -->
              <circle class="inner-ring" cx="500" cy="500" r="280">
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 500 500"
                  to="360 500 500"
                  dur="100s"
                  repeatCount="indefinite"
                />
              </circle>
              <!-- Outer ring -->
              <circle
                class="outer-ring"
                cx="500"
                cy="500"
                r="366.8"
                transform="rotate(0 500 500)"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 500 500"
                  to="-360 500 500"
                  dur="50s"
                  repeatCount="indefinite"
                />
              </circle>
              <!-- Outer thin ring -->
              <circle class="outer-thin-ring" cx="500" cy="500" r="395" />
            </g>
          </svg>
        </div>
        <div>WEATHER</div>
      </div>
    `;
  }
}

window.customElements.define("weather-clock-card", WeatherClockCard);
