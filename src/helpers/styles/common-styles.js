import {css} from 'lit';

export default css`
  :host {
    --primary-color: rgb(105, 211, 251);
    --primary-color-opacity: rgba(105, 211, 251, 0.5);
    --secondary-color: rgb(102, 156, 210);
    --secondary-color-opacity: rgba(102, 156, 210, 0.5);
    --error-color: rgb(255, 0, 0);
    --color-muted: rgb(170, 170, 170);
    --color-active-icon: rgb(255, 193, 7);
    --color-active-icon-opacity: rgba(255, 193, 7, 0.2);
    --color-error-icon: rgb(255, 0, 0);

    --font-size-title: 16px;
    --font-size-normal: 14px;
    --font-size-small: 12px;
    --font-size-xsmall: 10px;

    --icon-size-title: 36px;
    --icon-size-normal: 25px;
    --icon-size-small: 20px;
    --icon-size-xsmall: 15px;

    --gap-size: 10px;

    --card-border-width: 1px;
    --border-radius: 0.25rem;

    display: flex;
    flex-direction: column;
    font-family: 'Titillium Web', sans-serif;
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
