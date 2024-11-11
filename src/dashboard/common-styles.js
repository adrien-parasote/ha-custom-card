import { css } from "lit";

export default css`
  :host {
    --color-lightblue: rgb(105, 211, 251);
    --color-darkblue: rgb(102, 156, 210);
    --color-lightyellow: rgb(255, 215, 0);
    --color-darkyellow: rgb(255, 255, 0);
    --color-amber: rgb(255, 191, 0);
    --color-brass: rgb(225, 193, 110);
    --color-lightblue-opacity: rgba(105, 211, 251, 0.2);
    --color-darkblue-opacity: rgba(102, 156, 210, 0.2);
    --color-lightyellow-opacity: rgba(255, 215, 0, 0.2);
    --color-darkyellow-opacity: rgba(255, 255, 0, 0.2);
    --color-muted: rgb(170, 170, 170);
    --icon-size: 36px;
    --font-size-header: large;
    --font-size-normal: 14px;
    --font-size-small: small;
    --border-radius: 10px;
    --action-size: 24px;
    --action-color: rgb(139, 128, 0);
    --action-background-color: rgb(255, 255, 240);
    --toast-background-color: rgb(0, 0, 0);
    --toast-border-btn-radius: 5px;
    --toast-body-color: white;
    --gap-size: 10px;
    --card-border-width: 1px;
    display: flex;
    flex-direction: column;
    font-family: "Titillium Web", sans-serif;
    font-size: var(--font-size-normal);
    font-weight: 300;
    text-shadow: 0px 0px 5px var(--color-darkblue);
    color: var(--color-lightblue);
    /*align-items: center;*/
    line-height: normal;
  }
  /************* CONTAINER *************/
  .column {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .grow-1 {
    flex-grow: 1;
  }
  .grow-2 {
    flex-grow: 2;
  }
  .grow-3 {
    flex-grow: 3;
  }
  .row-gap {
    row-gap: var(--gap-size);
  }
  .column-gap {
    column-gap: var(--gap-size);
  }
  object {
    color-scheme: auto;
  }
  /************* INFO *************/
  .primary-info {
    padding-left: 5px;
    font-weight: bold;
  }
  .secondary-info {
    font-size: var(--font-size-small);
    padding-left: 10px;
  }
  .text-muted {
    text-shadow: none;
    color: var(--color-muted) !important;
  }
  /************* CORNER *************/
  .corner-border-top:before,
  .corner-border-top:after,
  .corner-border-bottom:before,
  .corner-border-bottom:after,
  .corner-border-top-alert:before,
  .corner-border-top-alert:after,
  .corner-border-bottom-alert:before,
  .corner-border-bottom-alert:after {
    border-style: solid;
    border-width: 0;
    border-color: var(--color-darkblue);
    content: "";
    height: 5px;
    position: absolute;
    width: 5px;
  }
  .corner-border-top-alert:before,
  .corner-border-top-alert:after,
  .corner-border-bottom-alert:before,
  .corner-border-bottom-alert:after {
    border-color: var(--color-darkyellow);
  }
  .corner-border-top::before,
  .corner-border-top-alert::before {
    border-left-width: var(--card-border-width);
    border-top-width: var(--card-border-width);
    left: 0;
    top: -1px;
  }
  .corner-border-top::after,
  .corner-border-top-alert::after {
    border-right-width: var(--card-border-width);
    border-top-width: var(--card-border-width);
    right: 0;
    top: -1px;
  }
  .corner-border-bottom::before,
  .corner-border-bottom-alert::before {
    border-bottom-width: var(--card-border-width);
    border-left-width: var(--card-border-width);
    bottom: -1px;
    left: 0;
  }
  .corner-border-bottom::after,
  .corner-border-bottom-alert::after {
    border-bottom-width: var(--card-border-width);
    border-right-width: var(--card-border-width);
    bottom: -1px;
    right: 0;
  }
`;
