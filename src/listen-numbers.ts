import { css, html, LitElement, PropertyValueMap } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '@material/mwc-dialog'
import '@material/mwc-icon-button'
import { sharedStyles } from './sharedStyles';
import { speak } from './speech';

@customElement('listen-numbers')
export class ListenNumbers extends LitElement {
  @state() number = 0;

  static styles = [sharedStyles, css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      font-size: 5em;
    }
  `]

  render() {
    return html`${this.number}`
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.addEventListener('click', ()=>{
      this.pickNewNumber()
    })
    this.pickNewNumber()
  }

  pickNewNumber () {
    const min = 10000
    const max = 10000000
    this.number = (~~(Math.random() * (max - min)) + min)

    speak(''+this.number)
  }
}