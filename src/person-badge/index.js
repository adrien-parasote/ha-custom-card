import { PersonBadge } from "./card.js";
import { PersonBadgeEditor } from "./editor.js";
import { PACKAGE } from "./const.js";

window.customElements.get(PACKAGE) ||
  window.customElements.define(PACKAGE, PersonBadge);
window.customElements.get(PACKAGE + "-editor") ||
  window.customElements.define(PACKAGE + "-editor", PersonBadgeEditor);

window.customBadges = window.customBadges || [];
window.customBadges.push({
  type: PACKAGE,
  name: "Sci-fi person badge",
  preview: true,
  description: "Render a sci-fi person badge",
});
