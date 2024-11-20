import { css } from "lit";

export default css`
  :host {
    width: fit-content;
    margin: 5px;
  }
  .avatar {
    border: 1px solid var(--secondary-color);
    box-shadow: 0 0 5px 1px var(--secondary-color);
    border-radius: 50%;
    height: var(--icon-size-title);
    width: var(--icon-size-title);
    position: relative;
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
    width: var(--icon-size-xsmall);
    height: var(--icon-size-xsmall);
  }
  img {
    width: auto;
    height: 100%;
    border-radius: 50%;
  }
`;
