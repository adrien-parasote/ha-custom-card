import { css } from "lit";

export default css`
  /************* FORM *************/
  .editor-row {
    align-items: center;
    margin-bottom: 5px;
  }
  .editor-rows {
    margin: 0 10px;
  }
  .editor-row-actions {
    display: flex;
    align-self: center;
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
  .btn-not-show {
    border: none;
    width: var(--icon-size-normal);
    height: var(--icon-size-normal);
    fill: var(--secondary-color);
  }
  .btn-not-show:hover {
    cursor: pointer;
    fill: var(--primary-color);
  }
  /************* INPUT *************/
  .input-group {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-width: 395px;
  }
  .input-group .input-group-prepend {
    display: flex;
  }
  .input-group .input-group-prepend .input-group-text {
    border-radius: var(--border-radius);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    color: white;
    display: flex;
    align-items: center;
    font-size: var(--font-size-small);
    text-align: center;
    border: var(--card-border-width) solid var(--primary-color);
    margin-right: -1px;
    padding: 0.5rem 1rem;
  }
  .input-group input {
    border-radius: var(--border-radius);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: var(--font-size-normal);
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    border: var(--card-border-width) solid var(--primary-color);
    color: var(--primary-color);
  }
  .input-group .input-info-text {
    font-size: var(--font-size-small);
    color: white;
    height: var(--font-size-small);
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
