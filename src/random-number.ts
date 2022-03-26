import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('random-number')
export class RandomNumber extends LitElement {
  static styles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  `
  render() {
    const random = ~~(Math.random() * 10000)
    return html`
    <mwc-button raised @click=${() => this.requestUpdate()} style="margin-top:24px;">${random}</mwc-button>
    `
  }
}