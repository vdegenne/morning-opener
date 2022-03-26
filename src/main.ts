// import { LitElement, html, css } from 'lit'
// import { customElement } from 'lit/decorators.js'
import '@material/mwc-snackbar'
import '@material/mwc-button'
import '@material/mwc-icon-button'

import './numbers-track'
import './english-random'
import './random-number'
import './random-direction'
// import '@material/mwc-icon-button'
// import '@material/mwc-dialog'
import '@material/mwc-textfield'
// import '@material/mwc-checkbox'

declare global {
  interface Window {
    // app: AppContainer;
    toast: (labelText: string, timeoutMs?: number) => void;
  }
}

// @customElement('app-container')
// export class AppContainer extends LitElement {

//   static styles = css``

//   render () {
//     return html`
//     <mwc-button>Hello There ! The app content goes here.</mwc-button>
//     `
//   }
// }
