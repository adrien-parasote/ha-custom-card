import { ActionsCard } from "./card.js";
import { ActionsCardEditor } from "./editor.js";
import { PACKAGE } from "./const.js";

window.customElements.get(PACKAGE) ||
  window.customElements.define(PACKAGE, ActionsCard);
window.customElements.get(PACKAGE + "-editor") ||
  window.customElements.define(PACKAGE + "-editor", ActionsCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: PACKAGE,
  name: "Render sci-fi dashboard",
  description: "Render sci-fi actions dashboard",
});
