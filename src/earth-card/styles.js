import { css } from "lit";

export default css`
  .planet-svg-container {
    width: 125px;
    height: 125px;
  }
  .planet-svg-container svg {
    stroke: var(--secondary-color);
  }
  .planet-svg-container .ring {
    stroke-miterlimit: 10;
    fill: none;
    stroke-width: 5;
    filter: url("#drop-shadow-filter");
  }
  .planet-svg-container .stroke-ring {
    stroke-dasharray: 12.1947, 12.1947, 12.1947, 12.1947, 12.1947, 12.1947;
  }
  .planet-svg-container .inner-ring {
    stroke-dasharray: 50, 90, 200, 30, 40, 0;
  }
  .planet-svg-container .outer-ring {
    stroke-linecap: square;
    stroke-dasharray: 120, 20, 110, 20, 140;
  }
  .planet-svg-container .outer-thin-ring {
    stroke-linecap: square;
  }
  .planet-svg-container .planet {
    stroke-width: 5;
    fill: none;
  }
  .planet-svg-container.path {
    stroke: var(--secondary-color);
    stroke-width: 2px;
    fill: none;
    filter: url("#drop-shadow-filter");
  }
  .planet-svg-container.details {
    stroke-width: 6px;
  }
  .planet-svg-container.bubble {
    fill: white;
    stroke-width: 0;
  }
  .date-panel .hour {
    font-size: 50px;
    text-align: center;
  }
  .date-panel .date,
  .date-panel .rest {
    color: var(--color-muted);
    text-shadow: none;
  }
  .date-panel .rest {
    align-self: end;
    gap: 5px;
  }
  .date-panel .icon {
    fill: var(--secondary-color);
    width: var(--state-icon-size);
    height: var(--state-icon-size);
  }
  .info-panel {
    align-self: end;
    width: 100px;
  }
  .info-panel svg {
    stroke: var(--secondary-color);
  }
  .info-panel .svg-container {
    width: 20px;
    height: 20px;
  }
  .info-panel .info-icon-off {
    stroke: none;
    fill: var(--secondary-color);
  }
  .info-panel .info-icon-on {
    stroke: none;
    fill: var(--color-active-icon);
  }
  .info-panel .icon-error {
    stroke: var(--color-error-icon);
  }
  .info-panel .info-card {
    font-size: var(--font-size-small);
    width: fit-content;
    align-items: center;
    margin: 2.5px;
  }
`;
