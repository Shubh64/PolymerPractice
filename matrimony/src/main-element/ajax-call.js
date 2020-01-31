import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';
/**
 * @customElement
 * @polymer
 */
class AjaxCall extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <app-location route="{{route}}" ></app-location>
    <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type="application/json"> </iron-ajax>
    <paper-toast id="toast" text={{message}} ></paper-toast>
    `;
    }
    static get properties() {
        return {
            users: String,
            userName: String,
            url: String,
            like:Object,
            message:String,
            oppGen:String
        };
    }
    ajaxCall(method, url, obj, action) {
        const ajax = this.$.ajax
        this.action = action
        ajax.body = obj ? JSON.stringify(obj) : undefined;
        ajax.method = method;
        ajax.url = url;
        ajax.generateRequest();
    }
    _handleResponse(event) {
        switch (this.action) {
            //comparing username and password captured from input and taken as a reponse from database by queryParam
            case ('login'): {
                this.users = event.detail.response
                if (this.users.length != 0) {
                    sessionStorage.setItem('isLogin', 'true')
                    this.dispatchEvent(new CustomEvent('loginCheck',{bubbles:true,composed:true}))
                    const { userName, gender, age, image, religion, height, profession, language } = event.detail.response[0]
                    const obj = { userName, gender, age, image, religion, height, profession, language }
                    sessionStorage.setItem('user', JSON.stringify(obj))
                    if(gender=='female'){
                      this.oppGen='male'
                    }
                    else{
                     this.oppGen='female'
                    }
                    this.handleRefresh(`http://localhost:3000/rishtey?gender=${this.oppGen}`);
                    console.log(`http://localhost:3000/rishtey?gender=${this.oppGen}`);
                    this.set('route.path', '/home')
                    break;
                }
                else {
                    alert('Not a Registered User')
                    break;
                }
            }
            case ('register'): {
                //checking for the various field values if they are null or not
                //  || this.dataObj.password == '' || this.dataObj.confirmPassword == '' || this.dataObj.email == ''
                if (this.dataObj.userName == '') { alert('please fill complete information ') }
                else {
                    let flag = event.detail.response
                    if (flag.length == 1) {
                        alert('username already exists')
                    }
                    else {
                        this.ajaxCall('POST', `http://localhost:3000/users`, this.dataObj, null)
                        alert('registration successful')
                        this.set('route.path', 'login')
                      }
                  }
                break;
            }
            case 'homepage': {
                console.log(event.detail.response)
                let dataObj = event.detail.response;
                console.log(dataObj,'ajaxResponse')
                this.dispatchEvent(new CustomEvent('dataResp', { detail: { dataObj }, bubbles: true, composed: true }))
               console.log('checkingDispatch event')
                break;
            }
            case 'userCheck': { 
                if(event.detail.response!='')
                {    alert('already Liked')   
                }else{
                    const { name, gender, age, image, religion, height, profession, language,likedBy } = this.like
                    const obj = { name, gender, age, image, religion, height, profession, language,likedBy }
                    this.ajaxCall('POST',`http://localhost:3000/wishlist`,obj,'wishlist')
                    this.openToast('Liked Sucessfully')
                    let {userName}=JSON.parse(sessionStorage.getItem('user'))
                    this.handleRefresh(`http://localhost:3000/wishlist?likedBy.userName=${userName}`);
                   console.log(`http://localhost:3000/rishtey?gender=${gender}`,'for homepage')
                   this.handleRefresh(`http://localhost:3000/rishtey?gender=${gender}`)
                break;
               }
           }
       }
    }
    handleRefresh(url) {
        console.log(url,"handleRefreshurl")
        this.ajaxCall('GET', url, null,'homepage')
    }
    openToast(message){
        this.message=message;
        this.$.toast.open();
    }   
}
window.customElements.define('ajax-call', AjaxCall);
