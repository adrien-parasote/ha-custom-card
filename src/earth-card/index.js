import { SciFiCard } from "./../utils/sci-fi-card.js";

import { EarthCard } from "./card.js";
import { EarthCardEditor } from "./editor.js";
import { PACKAGE } from "./const.js";

window.customElements.get("sci-fi-card") ||
  window.customElements.define("sci-fi-card", SciFiCard);
window.customElements.get(PACKAGE) ||
  window.customElements.define(PACKAGE, EarthCard);
window.customElements.get(PACKAGE + "-editor") ||
  window.customElements.define(PACKAGE + "-editor", EarthCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: PACKAGE,
  name: "Render sci-fi earth",
  description: "Render clock and display simple/visual entity info",
});
