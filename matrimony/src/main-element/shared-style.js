import '@polymer/polymer/polymer-element.js';
const template = document.createElement('template');
template.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
    :host {
        display: block;
      }
      paper-card{
        height: 700px;
        width:380px;
        margin: 20px;
        padding: 15px;
        color: #757575;
        border-radius: 5px;
        --paper-card-header-image:{
            height:400px;
        }
        background-color: linear-gradient(to right, #eaafc8, #654ea3);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    paper-input{
        text-align:center;
    }
    paper-radio-group{
        margin-left:30%;
    }
    #religion,#qualification{
        margin-left:32%;
    }
div{
    width:600px;
    height:auto;
    margin:auto;
    margin-top:5%;
    border:2px solid gray;
    padding-bottom:20px;
}
paper-button{
    background-color:grey;
    color:white;
    margin-left :40%;
    margin-top:2%;

}
    </style>
  </template>
</dom-module>`;

document.head.appendChild(template.content);