import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';
import './ajax-call.js';
import './shared-style.js';

/**
 * @customElement
 * @polymer
 */
class RegistrationPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <ajax-call id="ajax"></ajax-call>
      <paper-tabs selected="{{selected}}">
      <paper-tab>Personal Details</paper-tab>
      <paper-tab>Professional Details</paper-tab>
     </paper-tabs>
     <iron-pages selected="{{selected}}">
  <div> <paper-input id="userName" label="Enter Name"></paper-input>
  <label id="gender"></label>
  <paper-radio-group id="gender">
    <paper-radio-button name="male">Male</paper-radio-button>
    <paper-radio-button name="female">female</paper-radio-button>
  </paper-radio-group>
  <paper-dropdown-menu id="religion" label="Religion">
  <paper-listbox  slot="dropdown-content" selected="0">
  <paper-item>-------Select your Religion----------</paper-item>
    <paper-item>Hindu</paper-item>
    <paper-item>Muslim</paper-item>
    <paper-item>Sikh</paper-item>
    <paper-item>Christian</paper-item>
  </paper-listbox>
</paper-dropdown-menu>
<paper-input id="age" label=Age></paper-input>
<paper-input id="height" label=Height></paper-input>
  <paper-input id="email" label=Email></paper-input>
  <paper-input id="contact" label="Contact No."></paper-input> 
  <paper-button on-click="next" raised> Next</paper-button>
  </div>
  <div>
  <paper-dropdown-menu id="qualification" label="Qualification">
  <paper-listbox  slot="dropdown-content" selected="0">
  <paper-item>--Heighest Qualification--</paper-item>
    <paper-item>10th</paper-item>
    <paper-item>12th</paper-item>
    <paper-item>Graduate</paper-item>
    <paper-item>Post Graduate</paper-item>
  </paper-listbox>
</paper-dropdown-menu>
<paper-input id="profession" label=Profession></paper-input>
  <paper-input id="state" label=State></paper-input>
  <paper-input id="city" label=City></paper-input>
  <paper-input id="language" label=Language></paper-input>
   <paper-input id="password" label=Password></paper-input>
   <paper-input id="confirmPassword" label="Confirm Password"></paper-input>
<paper-button on-click="register" raised> Register</paper-button>
  </div>
    </iron-pages>
      `;
  }
  static get properties() {
    return {
      selected:{
      type:String,
      }
    };
  }
  register(event) {
    const userName = this.$.userName.value;
    const gender = this.$.gender.selected;
    const religion = this.$.religion.value;
    const email = this.$.email.value;
    const age = this.$.age.value;
    const height = this.$.height.value;
    const qualification = this.$.qualification.value;
    const profession = this.$.profession.value;
    const language = this.$.language.value;
    const city = this.$.city.value;
    const contact = this.$.contact.value;
    const state = this.$.state.value;
    const password = this.$.password.value;
    const confirmPassword = this.$.confirmPassword.value;
    const obj = { userName, gender, email, contact, password, religion, age, height, qualification,profession, language, city, contact, state }
    this.$.ajax.ajaxCall('GET', `http://localhost:3000/users?userName=${userName}`, null, 'register')
    this.$.ajax.dataObj = obj;
  }
  connectedCallback(){
    super.connectedCallback();
    this.selected='0';
    this.dispatchEvent(new CustomEvent('loginCheck',{bubbles:true,composed:true}))
  } 
  next(){
  this.selected='1';
}
}
window.customElements.define('registration-page', RegistrationPage);
