import { css } from "lit";

export default css`
  :host {
    --primary-color: rgb(105, 211, 251);
    --primary-color-opacity: rgba(105, 211, 251, 0.5);
    --secondary-color: rgb(102, 156, 210);
    --secondary-color-opacity: rgba(102, 156, 210, 0.5);
    --color-muted: rgb(170, 170, 170);

    --font-size-normal: 14px;
    --icon-size: 36px;
    --gap-size: 10px;

    --card-border-width: 1px;

    display: flex;
    flex-direction: column;
    font-family: "Titillium Web", sans-serif;
    font-size: var(--font-size-normal);
    font-weight: 300;
    text-shadow: 0px 0px 5px var(--secondary-color);
    color: var(--primary-color);
    line-height: normal;
  }
  /************* DISPLAY *************/
  .column {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .row-gap {
    row-gap: var(--gap-size);
  }
  .column-gap {
    column-gap: var(--gap-size);
  }
  .text-muted {
    text-shadow: none;
    color: var(--color-muted);
  }
  /************* CARD *************/
  .card {
    position: relative;
    padding: 5px;
  }
  .card-content {
    padding: 5px;
  }
  .corner-border-top:before,
  .corner-border-top:after,
  .corner-border-bottom:before,
  .corner-border-bottom:after {
    border-style: solid;
    border-width: 0;
    border-color: var(--secondary-color);
    content: "";
    height: 5px;
    position: absolute;
    width: 5px;
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
`;
