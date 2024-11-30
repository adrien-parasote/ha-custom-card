import {html} from 'lit';

import {BaseElement} from '../../helpers/cards/base-element.js';
import common_styles from '../../helpers/styles/common-styles.js';
import './../../helpers/entities/person.js';
import {PACKAGE} from './const.js';
import {PeopleCardEditor} from './editor.js';
import './editor.js';
import styles from './styles.js';

export class PeopleCard extends BaseElement {
  /**** DEFINE CARD ELEMENTS ****/
  static get styles() {
    return [common_styles, styles];
  }
  constructor() {
    super(PACKAGE);
  }
  setConfig(config) {
    if (!config.people) {
      throw new Error('You need to define a people entity list');
    }
    super.setConfig(config);
  }

  /**** DEFINE CARD EDITOR ELEMENTS ****/
  static getConfigElement() {
    return document.createElement(PACKAGE + '-editor');
  }
  static getStubConfig() {
    return {entity: 'person.entity'};
  }

  /**** RENDER CARD ****/
  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    return html`
      <sci-fi-card gap no-padding>
        <div class="row person">
          ${this._config.people.map((personEntity) => {
            return this.__renderPerson(personEntity);
          })}
        </div>
      </sci-fi-card>
    `;
  }
  __renderPerson(entityName) {
    const entity = this._hass.states[entityName];
    return html`
      <sci-fi-person
        entity-id="${entityName}"
        state="${entity.state}"
        picture="${entity.attributes.entity_picture}"
      >
      </sci-fi-person>
    `;
  }
}

window.customElements.get(PACKAGE) ||
  window.customElements.define(PACKAGE, PeopleCard);
window.customElements.get(PACKAGE + '-editor') ||
  window.customElements.define(PACKAGE + '-editor', PeopleCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: PACKAGE,
  name: 'Render sci-fi people card',
  description: 'Render sci-fi people',
});
