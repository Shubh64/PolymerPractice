import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './ajax-call.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js'
import './shared-style.js';
/**
 * @customElement
 * @polymer
 */
class MyWishlist extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
      </style>
      <ajax-call id="ajax"></ajax-call>
      <template is="dom-repeat" items={{list}}>
      <paper-card image="{{_getImage(item.image)}}">
      <p> Name : {{item.name}}</p>
      <p> Religion : {{item.religion}}</p>
      <p> Age:{{item.age}}</p>
      <p> Height:{{item.height}}</p>
      <p> Profession:{{item.profession}}</p>
      <p> Language:{{item.language}}</p>
      <paper-button on-click="_handleClick" raised id="button"> unlike</paper-button>
    </paper-card>
    </template>
    `;
  }
  static get properties() {
    return {
      list:{
        type:Array,
        value:[]},
        oppGen:String
    };
  }
  connectedCallback(){
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent('loginCheck',{bubbles:true,composed:true}))
    let {userName}=JSON.parse(sessionStorage.getItem('user'))
    this.$.ajax.ajaxCall('GET',`http://localhost:3000/wishlist?likedBy.userName=${userName}`,null,'homepage')
      }
      ready(){
        super.ready()
      this.addEventListener('dataResp',function(event) {
        console.log(event.detail.dataObj,"abhinav")
        this.list = event.detail.dataObj
      })}
      _handleClick(event){
        let {userName}=JSON.parse(sessionStorage.getItem('user'))
        this.$.ajax.ajaxCall('DELETE',`http://localhost:3000/wishlist/${event.model.item.id}`,null,null)
        this.$.ajax.openToast('Unliked Sucessfully')
        this.$.ajax.handleRefresh(`http://localhost:3000/wishlist?likedBy.userName=${userName}`);
      }
      _getImage(image){
        console.log(image)
        return this.resolveUrl(`../../images/${image}.jfif`)
        }
}

window.customElements.define('my-wishlist', MyWishlist);
