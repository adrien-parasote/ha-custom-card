import { BaseEditor } from "./../utils/base-element.js";
import { html } from "lit";

export class EarthCardEditor extends BaseEditor {
  static get properties() {
    return {
      _config: { type: Object },
    };
  }

  setConfig(config) {
    super.setConfig(config);
  }

  render() {
    if (!this._config) return html``;
    return html`TODO`;
  }

  __dispatchChange(newConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
