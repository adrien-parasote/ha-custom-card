import { BaseEditor } from "../../helpers/cards/base-editor.js";
import styles from "../../helpers/styles/common-styles.js";
import editorStyles from "../../helpers/styles/editor-styles.js";
import { html, css } from "lit";

export class ActionsCardEditor extends BaseEditor {
  static get styles() {
    return [styles, editorStyles, css``];
  }

  // Private

  render() {
    if (!this._config) return html``;
    return html`TODO`;
  }

  _update(e) {
    e.preventDefault();
    var newConfig = this.getNewConfig();
    this.dispatchChange(newConfig);
  }

  _add(e) {
    e.preventDefault();
    var newConfig = this.getNewConfig();
    this.dispatchChange(newConfig);
  }
}
