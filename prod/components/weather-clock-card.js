import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom import
import weatherIconsMap from "./weather-icons.js";

// Custom CSS
import styles from "./common-styles.js";

// Version
const VERSION = "1.0";
console.info(
  `%cWEATHER-CLOCK-CARD Version: ${VERSION}`,
  "color: rgb(105, 211, 251); font-weight: bold; background: black",
);

export class WeatherClockCard extends LitElement {
  static styles = [
    styles,
    css`
      :host{
        --weather-icon-size: 75px;
      }
      .svg-container {
        width: 125px;
        height: 125px;
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
      .details {
        stroke-width: 6px;
      }
      .bubble {
        fill: white;
        stroke-width: 0;
      }
      .clock-container,
      .weather-container {
        height: fit-content;
      }
      .weather-container {
        align-self: self-end;
      }
      .clock-container:after, .weather-container:after {
        border-top: 1px solid var(--color-darkblue);
        border-bottom: 1px solid var(--color-darkblue);
        border-right: 1px solid var(--color-darkblue);
        width: 15px;
        content: "";
      }
      .clock-container:before, .weather-container:before {
        border-top: 1px solid var(--color-darkblue);
        border-bottom: 1px solid var(--color-darkblue);
        border-left: 1px solid var(--color-darkblue);
        width: 15px;
        content: "";
      }
      .clock {
        padding: 10px;
      }
      .temperature {
        padding: 10px;
        padding-top: 0;
        text-align: right;
      }
      .hour {
        font-size: 50px;
      }
      .date,
      .rest {
        color: var(--color-muted);
        text-shadow: none;
      }
      .rest {
        text-align: end;
      }
      .control-img {
        width: var(--weather-icon-size);
        min-width: var(--weather-icon-size);
        max-width: var(--weather-icon-size);
        height: var(--weather-icon-size);
      }
    `,
  ];

  static get properties() {
    return {
      _date: { type: Object },
      work: { type: String },
      weather: { type: String },
      dayType: { type: String }, // day or night,
      temperature: { type: Number },
      temperature_unit: { type: String },
    };
  }

  constructor() {
    super();
    // Clock
    this._date = new Date();
    this.work = this.work ? this.work : "off";
    // Weather
    this.weather = this.weather ? this.weather : "snowy";
    this.dayType = this.dayType ? this.dayType : "day";
    this.temperature = this.temperature ? this.temperature : 0.0;
    this.temperature_unit = this.temperature_unit
      ? this.temperature_unit
      : "°C";

    setInterval(() => {
      this._date = new Date();
    }, 1000);
  }

  render() {
    return html`
      <div class="row">
        ${this.__getDateCard()}
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
            <g>
              <!-- info paths -->
              <path class="path details" d="M 0 200 L 150 200 L 200 250 " />
              <path class="path details" d="M 800 750 L 840 800 L 1000 800 " />
            </g>
        </svg>
        </div>
        ${this.__getWeatherCard()}
      </div>
    `;
  }

  __getHour() {
    const options = {
      minimumIntegerDigits: 2,
      useGrouping: false,
    };
    return [
      this._date.getHours().toLocaleString("fr-FR", options),
      this._date.getMinutes().toLocaleString("fr-FR", options),
    ].join(":");
  }

  __getDate() {
    const options = {
      minimumIntegerDigits: 2,
      useGrouping: false,
    };
    const daysOfWeek = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return [
      [daysOfWeek[this._date.getDay()], ","].join(""),
      [
        this._date.getDate().toLocaleString("fr-FR", options),
        this._date.getMonth().toLocaleString("fr-FR", options),
        this._date.getFullYear().toLocaleString("fr-FR", options),
      ].join("."),
    ].join(" ");
  }

  _isWorkingDay() {
    return this.work == "on";
  }

  __getDateCard() {
    return html`
      <div class="clock-container row">
        <div class="column clock">
          <div class="rest">${this._isWorkingDay() ? "Travail" : "Repos"}</div>
          <div class="hour">${this.__getHour()}</div>
          <div class="date">${this.__getDate()}</div>
        </div>
      </div>
    `;
  }

  __getWeatherCard() {
    const imgPath = SVG_FOLDER_PATH+weatherIconsMap[this.weather][this.dayType];
    console.log(imgPath)
    return html`
      <div class="weather-container row">
        <div class="column">
          <div class="control-img">
            <object type="image/svg+xml" data="${imgPath}"></object>
          </div>
          <div class="temperature">${this.temperature} ${this.temperature_unit}</div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("weather-clock-card", WeatherClockCard);
