import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('random-direction')
class RandomDirection extends LitElement {
  arrows = ['⬅️', '↖️', '⬆️', '↗️', '➡️', '↘️', '⬇️', '↙️']

  static styles = css`
  :host {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
    font-size: 4em;
    font-weight: bold;
    text-align: center;
    user-select: none;
  }
  `
  render() {
    const arrow = this.arrows[Math.floor(Math.random() * this.arrows.length)]
    return html`${arrow}`
  }

  firstUpdated() {
    window.addEventListener('click', () => this.requestUpdate())
  }
}