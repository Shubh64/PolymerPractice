import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
/**
 * @customElement
 * @polymer
 */
setRootPath(globalPath.rootPath);
class MainElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;
          display: block;
        }
        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }
        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }
        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }
        .drawer-list {
          margin: 0 20px;
        }
        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }
        a{
          text-decoration:none;
          color:white;
          font-size:20px;

        }
     app-header{
        background-color:gray;
     }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>
      <app-location route="{{route}}" ></app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" >
      </app-route>
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Main content -->
        <app-header-layout has-scrolling-region="">
          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Matrimony App</div>
          <iron-selector selected="[[page]]" attr-for-selected="name"  role="nav">
          <template is="dom-if" if=[[!isLogin]]>
          <a name="register" href="[[rootPath]]register">Register</a>
             <a name="login" href="[[rootPath]]login">Login</a>
             </template>
             <template is="dom-if" if=[[isLogin]]>
             <a name="home" href="[[rootPath]]home">Home</a>
             <a name="response"  href="[[rootPath]]response">My Response</a>
             <a name="wishlist"  href="[[rootPath]]wishlist">My wishlist</a>
             <paper-button on-click="_handleClick">Logout</paper-button>
             </template>
             </iron-selector>
            </app-toolbar>
          </app-header>
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <home-page name="home"></home-page>
            <login-page name="login"></login-page>
            <registration-page name="register"></registration-page>
            <my-response name="response"></my-response>
            <my-wishlist name="wishlist"></my-wishlist>
            <error-page name="error"></error-page>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      isLogin:Boolean
    };
  }
  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }
  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'home' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'home';
    } else if (['home', 'login', 'register','response','wishlist'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'error';
    }

    // Close a non-persistent drawer when the page & route are changed. 
  }
  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'home':
        import('./home-page.js');
        break;
      case 'login':
        import('./login-page.js');
        break;
      case 'register':
        import('./registration-page.js');
        break;
      case 'wishlist':
        import('./my-wishlist.js');
        break;
      case 'response':
        import('./my-responses.js');
        break;
      case'error':
        import('./error-page.js')
        break;
    }
  }
  _handleClick(){
    let value=confirm('Do u really want to log out?')
        if(value){
        sessionStorage.clear()
        this.set('route.path', '/login')
        this.isLogin=false
        }
  }
  ready(){
    super.ready()
    this.addEventListener('loginCheck',function(event) {
      this.isLogin = sessionStorage.getItem('isLogin')
    })
  }
}

window.customElements.define('main-element', MainElement);
