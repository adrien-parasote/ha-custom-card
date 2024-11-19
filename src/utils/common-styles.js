import { css } from "lit";

export default css`
  :host {
    --primary-color: rgb(105, 211, 251);
    --primary-color-opacity: rgba(105, 211, 251, 0.5);
    --secondary-color: rgb(102, 156, 210);
    --secondary-color-opacity: rgba(102, 156, 210, 0.5);
    --color-muted: rgb(170, 170, 170);
    --color-active-icon: rgb(255, 193, 7);
    --color-error-icon: rgb(255, 0, 0);

    --font-size-title: 16px;
    --font-size-normal: 14px;
    --font-size-small: 12px;

    --icon-size: 36px;
    --icon-size-small: 20px;
    --state-icon-size: 15px;

    --gap-size: 10px;

    --card-border-width: 1px;
    --border-radius: 0.25rem;

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
  /************* EDITOR *************/
  .editor-row {
    align-items: center;
    margin-bottom: 5px;
  }
  .editor-rows {
    margin: 0 10px;
  }
  .editor-row-actions {
  }
  .editor-label {
  }
  .editor-card-actions {
    display: flex;
    align-self: self-end;
    padding: 0 10px;
  }
  /************* BUTTON *************/
  .btn {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    border-radius: var(--border-radius);
    border: var(--card-border-width) solid var(--primary-color);
    width: var(--icon-size-small);
    height: var(--icon-size-small);
    fill: var(--primary-color);
    padding: 5px;
  }
  .btn:hover {
    cursor: pointer;
    background-color: var(--secondary-color-opacity);
  }
  /************* DROPDOWN *************/
  .dropdown {
    flex-grow: 1;
  }
  .dropdown .dropdown-toggle {
    position: relative;
    font-size: var(--font-size-normal);
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    padding: 0.5rem 1rem;
    border: var(--card-border-width) solid var(--primary-color);
    color: var(--primary-color);
    border-radius: var(--border-radius);
    width: 100%;
  }
  .dropdown .dropdown-toggle:hover {
    cursor: pointer;
    background-color: var(--secondary-color-opacity);
  }
  .dropdown .dropdown-toggle::after {
    top: 45%;
    right: 15px;
    position: absolute;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
  .dropdown .dropdown-menu {
    background: black;
    border: var(--card-border-width) solid var(--primary-color);
    color: var(--primary-color);
    position: absolute;
    z-index: 1000;
    display: none;
    width: fit-content;
    text-align: left;
    border-radius: var(--border-radius);
  }
  .dropdown .dropdown-menu.show {
    display: block;
    position: absolute;
  }
  .dropdown .dropdown-menu .dropdown-item {
    border: var(--card-border-width) solid transparent;
    display: block;
    padding: 5px 10px;
    font-weight: 400;
    color: var(--secondary-color);
  }
  .dropdown .dropdown-menu .dropdown-item:hover {
    cursor: pointer;
    border: var(--card-border-width) solid var(--primary-color);
    color: var(--primary-color);
    background-color: var(--secondary-color-opacity);
  }
`;
