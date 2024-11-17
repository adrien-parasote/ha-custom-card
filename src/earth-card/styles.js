import { css } from "lit";

export default css`
  :host {
    --state-icon-size: 15px;
  }
  .planet-svg-container {
    width: 125px;
    height: 125px;
    svg {
      stroke: var(--secondary-color);
    }
    .ring {
      stroke-miterlimit: 10;
      fill: none;
      stroke-width: 5;
      filter: url("#drop-shadow-filter");
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
      stroke: var(--secondary-color);
      stroke-width: 2px;
      fill: none;
      filter: url("#drop-shadow-filter");
    }
    .details {
      stroke-width: 6px;
    }
    .bubble {
      fill: white;
      stroke-width: 0;
    }
  }

  .date-panel {
    .hour {
      font-size: 50px;
    }
    .date,
    .rest {
      color: var(--color-muted);
      text-shadow: none;
    }
    .rest {
      align-self: end;
      gap: 5px;
    }
    .icon {
      fill: var(--secondary-color);
      width: var(--state-icon-size);
      height: var(--state-icon-size);
    }
  }

  .info-panel {
    align-self: end;
    width: 100px;
    svg {
      stroke: var(--secondary-color);
    }
    .svg-container {
      width: 20px;
      height: 20px;
    }
    .info-icon-off {
      stroke: none;
      fill: var(--secondary-color);
    }
    .info-icon-on {
      stroke: none;
      fill: var(--color-active-icon);
    }
    .icon-error {
      stroke: var(--color-error-icon);
    }
    .info-card {
      font-size: var(--font-size-small);
      width: fit-content;
      align-items: center;
      margin: 2.5px;
    }
  }
`;
