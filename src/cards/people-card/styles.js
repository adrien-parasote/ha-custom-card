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
  sci-fi-card {
    width: fit-content;
  }
  .person:last-child {
    margin-right: 5px;
  }
`;
