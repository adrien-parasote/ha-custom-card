import { html} from "lit";

export const vacuumMoving = html`
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" style="fill: transparent;stroke:rgb(255, 193, 7);">
  <path style="transform-origin: 12px 12px;" d="M5,3A2,2 0 0,0 3,5V7H5V5H19V7H21V5A2,2 0 0,0 19,3H5M8,7V9H16V7H8M3,9V12A9,9 0 0,0 12,21A9,9 0 0,0 21,12V9H19V12A7,7 0 0,1 12,19A7,7 0 0,1 5,12V9H3M12,12A2.5,2.5 0 0,0 9.5,14.5A2.5,2.5 0 0,0 12,17A2.5,2.5 0 0,0 14.5,14.5A2.5,2.5 0 0,0 12,12Z">
    <animateTransform type="rotate" additive="sum" attributeName="transform" values="0; 25; 0; -25; 0" begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"/>
  </path>
</svg>
`;