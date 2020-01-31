import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js'
import './ajax-call.js';
import './shared-style.js';
/**
 * @customElement
 * @polymer
 */
class HomePage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        
      </style >
      
      <ajax-call id="ajax"></ajax-call>
      <template is="dom-repeat" items={{list}}>
      <paper-card image="{{_getImage(item.image)}}">
      <p> Name : {{item.name}}</p>
      <p> Religion : {{item.religion}}</p>
      <p> Age:{{item.age}}</p>
      <p> Height:{{item.height}}</p>
      <p> Profession:{{item.profession}}</p>
      <p> Language:{{item.language}}</p>
      <paper-button raised on-click="_handleClick">Like</paper-button>
    </paper-card>
    </template>`;
  }
  static get properties() {
    return {
      list:{
      type:Array,
      value:[]},
      oppGen:String,
      user:Object
    };
  }
  connectedCallback(){
    super.connectedCallback();
    this.user=JSON.parse(sessionStorage.getItem('user'))
    const {gender}=this.user;
    this.dispatchEvent(new CustomEvent('loginCheck',{bubbles:true,composed:true}))
    if(gender=='female'){
      this.oppGen='male'
    }
    else{
     this.oppGen='female'
    }
    this.$.ajax.ajaxCall('GET',`http://localhost:3000/rishtey?gender=${this.oppGen}`,null,'homepage')
}
ready(){
  super.ready()
this.addEventListener('dataResp',function(event) {
  this.list = event.detail.dataObj;
  console.log(this.list,'HomepageResponse')
})}
_handleClick(event){
const {userName}=this.user
event.model.item.likedBy=this.user;
this.$.ajax.like=event.model.item;
this.$.ajax.ajaxCall('GET',`http://localhost:3000/wishlist?likedBy.userName=${userName}&&name=${event.model.item.name}`,null,'userCheck')
}
_getImage(image){
  console.log(image)
return this.resolveUrl(`../../images/${image}.jfif`)
}
}
window.customElements.define('home-page', HomePage);
