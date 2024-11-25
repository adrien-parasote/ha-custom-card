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
`;
