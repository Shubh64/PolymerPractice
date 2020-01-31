import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './ajax-call.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import './shared-style.js';
/**
 * @customElement
 * @polymer
 */
class MyResponse extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
      </style>
      <ajax-call id="ajax"></ajax-call>
      <template is="dom-repeat" items={{list}}>
      <paper-card  image="{{_getImage(item.likedBy.image)}}">
      <p> Name : {{item.likedBy.userName}}</p>
      <p> Religion : {{item.likedBy.religion}}</p>
      <p> Age:{{item.likedBy.age}}</p>
      <p> Height:{{item.likedBy.height}}</p>
      <p> Profession:{{item.likedBy.profession}}</p>
      <p> Language:{{item.likedBy.language}}</p>
      <paper-button on-click="_handleClick" raised id="button"> unlike</paper-button>
    </paper-card>
    </template>`;
  }
  static get properties() {
    return {
      list:{
        type:Array,
        value:[]}
    };
  }
  connectedCallback(){
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent('loginCheck',{bubbles:true,composed:true}))
    let {userName}=JSON.parse(sessionStorage.getItem('user'))
    console.log(userName)
    this.$.ajax.ajaxCall('GET',`http://localhost:3000/wishlist?name=${userName}`,null,'homepage')
      }
      ready(){
        super.ready()
      this.addEventListener('dataResp',function(event) {
        this.list = event.detail.dataObj
      })}
      _getImage(image){
        console.log(image)
        return this.resolveUrl(`../../images/${image}.jfif`)
        }
}

window.customElements.define('my-response', MyResponse);
