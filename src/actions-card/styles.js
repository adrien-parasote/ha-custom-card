import { css } from "lit";

export default css`
  :host {
    min-width: 100vh;
  }
  .bar {
    border-top: var(--card-border-width) solid var(--primary-color);
    content: "";
    flex-grow: 2;
  }
  .diag-left {
    flex-grow: 1;
    background: linear-gradient(
      to top right,
      rgba(105, 211, 251, 0) 0%,
      rgba(105, 211, 251, 0) calc(50% - 0.8px),
      rgba(105, 211, 251, 1) 50%,
      rgba(105, 211, 251, 0) calc(50% + 0.8px),
      rgba(105, 211, 251, 0) 100%
    );
  }
  .diag-right {
    flex-grow: 1;
    background: linear-gradient(
      to top left,
      rgba(105, 211, 251, 0) 0%,
      rgba(105, 211, 251, 0) calc(50% - 0.8px),
      rgba(105, 211, 251, 1) 50%,
      rgba(105, 211, 251, 0) calc(50% + 0.8px),
      rgba(105, 211, 251, 0) 100%
    );
  }
  .actions-badge-content {
    flex-grow: 3;
    border-bottom: var(--card-border-width) solid var(--primary-color);
    padding: 0 5px 10px 5px;
    justify-content: center;
  }
  .action-card:hover {
    cursor: pointer;
    background-color: var(--secondary-color-opacity);
  }
  .action-state {
    color: var(--secondary-color);
    font-size: var(--font-size-xsmall);
    text-shadow: none;
  }
  .action-icon {
  }
  .action-name {
    color: var(--primare-color);
    font-size: var(--font-size-small);
  }
`;
