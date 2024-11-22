import { BaseEditor } from "./../../utils/base-editor.js";
import { html } from "lit";

export class InfoCardEditor extends BaseEditor {
  static get properties() {
    return {
      _config: { type: Object },
    };
  }

  setConfig(config) {
    super.setConfig(config);
  }

  render() {
    if (!this._config || !this._personEntities) return html``;
    return html`
      <sci-fi-card content-display="column" gap title="crew">
        TODO
      </sci-fi-card>
    `;
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
