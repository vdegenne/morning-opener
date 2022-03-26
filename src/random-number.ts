import { css, html, LitElement, PropertyValueMap } from 'lit';
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
    cursor: pointer;
    user-select: none;
  }
  `
  render() {
    const random = ~~(Math.random() * 10000)
    return html`
    <div style="font-size:3em;font-weight:bold">${random}</div>
    `
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.addEventListener('click', () => this.requestUpdate())
  }
}