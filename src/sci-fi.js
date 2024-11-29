import { PACKAGE_NAME, VERSION } from "./utils/const.js";

import "./helpers/cards/sci-fi-card.js";
import "./helpers/cards/accordion-card.js";

import "./cards/info-card/card.js";
import "./cards/people-card/card.js";
import "./cards/actions-card/card.js";

console.info(
  `%c🚀 ${PACKAGE_NAME.toUpperCase()} 🚀 - v${VERSION}`,
  "color: rgb(105, 211, 251); background-color: rgba(102, 156, 210, 0.5); font-weight: 700;",
);
