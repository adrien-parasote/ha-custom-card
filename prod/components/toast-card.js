import { LitElement, html, css } from "https://unpkg.com/lit-element@3.2.1/lit-element.js?module";

// Custom CSS
import styles from '/local/custom/css/custom.css' with { type: 'css' }; 

export class ToastCard extends LitElement {
  static styles = [
    styles,
    css`
    :host {
      z-index: 1000;
      width: -webkit-max-content;
      width: -moz-max-content;
      width: max-content;
      max-width: 100%;
      min-width: 250px;
      position: fixed;
      bottom: 10px;
      left: 60px;
    }
    @-webkit-keyframes fadein, @keyframes fadein  {
      from {bottom: 0; opacity: 0;}
      to {bottom: 30px; opacity: 1;}
    }
    @-webkit-keyframes fadeout, @keyframes fadeout {
      from {bottom: 30px; opacity: 1;}
      to {bottom: 0; opacity: 0;}
    }
    .toast {
      visibility: hidden;
      background-color: var(--toast-background-color);
      border: 1px solid var(--color-darkblue);
      border-radius: 0.25rem;
      animation: fadein 2.5s, fadeout 2.5;
      
      .toast-header {
        background-color: var(--color-darkblue-opacity);
        padding: 5px 10px;
        border-bottom: 1px solid var(--color-darkblue);
        display: flex;
        flex-direction: row;
        align-items: center;
       
        > div {
          text-transform: uppercase;
          text-shadow: none;
          font-weight: bold;
          flex-grow: 1;
        }
      }
      .toast-btn-close {
        color: var(--color-lightblue);
        text-shadow: 0px 0px 5px var(--color-darkblue);
        font-weight: bold;
        box-sizing: content-box;
        border: none;
        background: transparent;
        cursor: pointer;
      }
      .toast-body {
        color: var(--toast-body-color);
        padding: 10px;
        word-wrap: break-word;
        text-shadow: none;
      }
    }
    .toast.show {
      visibility: visible;
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }`
  ];
  
  static get properties() {
    return {
      msg: { type: String }
    };
  }
  
  constructor() {
    super();
    this.msg = this.msg ? this.msg : "";
  }

  render() {
    return html`
      <div class="toast">
        <div class="toast-header"><div>Message</div></div> 
        <div class="toast-body">${this.msg}</div> 
      </div>
    `;
  }
  
  show(msg){
    this.msg = msg;
    const toast = this.shadowRoot.querySelector(".toast");
    toast.classList.add("show");
    setTimeout(function(){ toast.classList.remove("show"); }, 3000);
  }
}

window.customElements.define('toast-card', ToastCard);
