import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import './ajax-call.js';
import './shared-style.js';
/**
 * @customElement
 * @polymer
 */
class LoginPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
      </style>
      <ajax-call id="ajax"></ajax-call>
      <div>
      <paper-input id="userName" label=UserName></paper-input>
      <paper-input id="password" label=Password></paper-input>
      <paper-button on-click="signIn" raised id="button"> signIn</paper-button>
      </div>`;
  }
  static get properties() {
    return {
    };
  }
  signIn(event)
  {
    const userName = this.$.userName.value;
    const password = this.$.password.value;
    this.$.ajax.ajaxCall('GET',`http://localhost:3000/users?userName=${userName}&&password=${password}`,null,'login')  
    
  } 
  connectedCallback(){
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent('loginCheck',{bubbles:true,composed:true}))
  }
}

window.customElements.define('login-page', LoginPage);
