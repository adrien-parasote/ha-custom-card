import { css } from "lit";

export default css`
  :host {
    font-size: var(--font-size-small);
    --border-cut: 4px;
    --button-shape: polygon(
      0 var(--border-cut),
      var(--border-cut) 0,
      calc(50% - var(--border-cut) - 10px) 0%,
      calc(calc(50% - var(--border-cut) - 10px) + var(--border-cut))
        var(--border-cut),
      calc(calc(50% - var(--border-cut) - 10px) + var(--border-cut) + 20px)
        var(--border-cut),
      calc(
          calc(50% - var(--border-cut) - 10px) + var(--border-cut) + 20px +
            var(--border-cut)
        )
        0,
      calc(100% - var(--border-cut)) 0,
      100% var(--border-cut),
      100% calc(50% - var(--border-cut) - 5px),
      calc(100% - var(--border-cut))
        calc(50% - var(--border-cut) - 5px + var(--border-cut)),
      calc(100% - var(--border-cut))
        calc(50% - var(--border-cut) - 5px + var(--border-cut) + 10px),
      100%
        calc(
          50% - var(--border-cut) - 5px + var(--border-cut) + 10px +
            var(--border-cut)
        ),
      100% calc(100% - var(--border-cut)),
      calc(100% - var(--border-cut)) 100%,
      calc(
          calc(50% - var(--border-cut) - 10px) + var(--border-cut) + 20px +
            var(--border-cut)
        )
        100%,
      calc(calc(50% - var(--border-cut) - 10px) + var(--border-cut) + 20px)
        calc(100% - var(--border-cut)),
      calc(calc(50% - var(--border-cut) - 10px) + var(--border-cut))
        calc(100% - var(--border-cut)),
      calc(calc(50% - var(--border-cut) - 10px)) 100%,
      var(--border-cut) 100%,
      0 calc(100% - var(--border-cut)),
      0
        calc(
          calc(50% - var(--border-cut) - 5px) + var(--border-cut) + 10px +
            var(--border-cut)
        ),
      var(--border-cut)
        calc(calc(50% - var(--border-cut) - 5px) + var(--border-cut) + 10px),
      var(--border-cut)
        calc(calc(50% - var(--border-cut) - 5px) + var(--border-cut)),
      0 calc(calc(50% - var(--border-cut) - 5px))
    );
  }

  .action-container {
    color: var(--secondary-color);
    border: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: center;
    align-self: center;
    vertical-align: middle;
    box-sizing: border-box;
    position: relative;
    min-height: 50px;
    min-width: 70px;
    white-space: nowrap;
    z-index: 1;
    user-select: none;
    outline: 0;
    padding: 15px;
    background-color: transparent;
  }

  .action-container:before,
  .action-container:after {
    content: "";
    inset: 0;
    background: var(--secondary-color);
    position: absolute;
    z-index: -1;
    clip-path: var(--button-shape);
    box-shadow: inset 0 0 25px -10px var(--secondary-color);
  }

  .action-container:after {
    inset: var(--card-border-width);
    background: #0d0a11;
  }

  .action-container .helper {
    content: "";
    position: absolute;
    inset: calc(var(--border-cut) / 2);
    background: var(--secondary-color);
    z-index: -2;
  }
  .action-container:hover {
    cursor: pointer;
    color: var(--primary-color);
  }
  .action-container:hover .icon {
    fill: var(--primary-color);
  }
  .icon-container {
    width: var(--icon-size-small);
    height: var(--icon-size-small);
    align-content: center;
  }
  .icon {
    fill: var(--secondary-color);
  }
  .column-gap {
    gap: 5px;
    align-items: center;
  }
`;
