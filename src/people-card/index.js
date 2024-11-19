import { SciFiCard } from "./../utils/sci-fi-card.js";

import { PeopleCard } from "./card.js";
import { PeopleCardEditor } from "./editor.js";
import { PACKAGE } from "./const.js";

window.customElements.get("sci-fi-card") ||
  window.customElements.define("sci-fi-card", SciFiCard);
window.customElements.get(PACKAGE) ||
  window.customElements.define(PACKAGE, PeopleCard);
window.customElements.get(PACKAGE + "-editor") ||
  window.customElements.define(PACKAGE + "-editor", PeopleCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: PACKAGE,
  name: PACKAGE + " custom element",
  description: "Render sci-fi people",
});
