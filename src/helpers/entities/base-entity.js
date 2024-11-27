import { LitElement } from "lit";
import common_styles from "../styles/common-styles.js";


export class BaseEntity extends LitElement {
  static get styles() {
    return [common_styles];
  }

  static get properties() {
    return {
      entityId: { type: String, attribute: "entity-id" },
      state: { type: String },
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.entityId = this.entityId ? this.entityId : null;
    this.state = this.state ? this.state : null;
    this.name = this.name ? this.name : null;
  }
}
