import { css } from "lit";

export default css`
  :host {
    --primary-color: rgb(105, 211, 251);
    --primary-color-opacity: rgba(105, 211, 251, 0.5);
    --secondary-color: rgb(102, 156, 210);
    --secondary-color-opacity: rgba(102, 156, 210, 0.5);
    --color-muted: rgb(170, 170, 170);
    --color-active-icon: rgb(255, 193, 7);

    --font-size-normal: 14px;
    --font-size-small: 12px;
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
  .flex-wrap {
    flex-wrap: wrap;
  }
  .text-muted {
    text-shadow: none;
    color: var(--color-muted);
  }
`;
