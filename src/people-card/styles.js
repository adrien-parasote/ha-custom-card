import { css } from "lit";

export default css`
  :host {
    min-width: calc(var(--icon-size-small) + 15px);
  }
  .column {
    align-items: center;
  }
  .column-gap {
    column-gap: calc(var(--gap-size) * 2);
  }
  .avatar {
    border: 1px solid var(--secondary-color);
    box-shadow: 0 0 5px 1px var(--secondary-color);
    border-radius: 50%;
    height: var(--icon-size);
    width: var(--icon-size);
    position: relative;
  }
  img {
    width: auto;
    height: 100%;
    border-radius: 50%;
  }
  .icon-container {
    background-color: var(--secondary-color-opacity);
    border-radius: 50%;
    width: var(--icon-size-small);
    height: var(--icon-size-small);
    position: absolute;
    top: -5px;
    right: -10px;
    text-align: center;
    align-content: end;
  }
  .icon {
    fill: var(--primary-color);
    width: var(--state-icon-size);
    height: var(--state-icon-size);
  }
  .avatar-info {
    align-self: center;
    margin: auto;
    font-weight: bold;
    padding-top: 5px;
    min-width: 55px;
  }
  sci-fi-card {
    width: fit-content;
  }
`;
