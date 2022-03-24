import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { TextField } from '@material/mwc-textfield';

@customElement('numbers-track')
export class NumbersTrack extends LitElement {
  @state() listening = false;
  @property({ reflect: true }) status = 'pending'

  private _audios: HTMLAudioElement[] = []
  private _length = 4;
  private _randoms: number[] = []

  @query('#textfield') textfield!: TextField;

  constructor () {
    super()
    // Precache all the number files
    let i = 0
    for (; i < 10; ++i) {
      this._audios[i] = new Audio(`./audios/${i + 1}.wav`)
    }
  }

  static styles = css`
  #textfield {
    width: 100%;
  }
  :host([status=correct]) #textfield {
    --mdc-theme-primary: green;
  }
  :host([status=fail]) #textfield {
    --mdc-theme-primary: red;
  }
  /* mwc-textfield[label=length] {
    width: initial;
    margin: 12px
  } */
  `
  render () {
    return html`
    <div style="display:flex;justify-content:center;align-items:center">
      <mwc-textfield
        label=length
        type=number
        min=1
        max=20
        @change=${(e) => { this._length = +e.target.value} }
        value=${this._length}></mwc-textfield>
      <mwc-button raised
        ?disabled=${this.listening}
        @click=${this.startListening}
        style="margin:24px" icon="casino">new</mwc-button>
      <mwc-icon-button icon="play_arrow"
        ?disabled=${this.listening || this._randoms.length === 0}
        @click=${this.speak}></mwc-icon-button>
    </div>
    <mwc-textfield id="textfield"
      helperPersistent
      ?disabled=${this.listening || this._randoms.length === 0}
      @keypress=${(e) => { this.compare(e) }}></mwc-textfield>
    `
  }

  async startListening () {
    this.textfield.value = ''
    // We generate a number of length {this._length}
    this._randoms = [...Array(this._length)].map(_=>(Math.random()*this._audios.length-1|0) + 1)
    // Speak them
    await this.speak()
    this.status = 'pending'
    this.textfield.helper = ''
    // await this.updateComplete
    // this.textfield.focus()
  }

  async speak () {
    this.listening = true
    let i =0
    for (; i < this._randoms.length; ++i) {
      await new Promise(resolve => setTimeout(resolve, 200))
      // await new Promise(resolve => {
      //   this._audios[this._randoms[i] - 1].onended = resolve
      //   this._audios[this._randoms[i] - 1].play()
      // })
      new Audio(`./audios/${this._randoms[i]}.wav`).play()
    }
    this.listening = false
    setTimeout(() => this.textfield.focus(), 400)
  }

  compare(e) {
    if (e.key === 'Enter') {
      if (this._randoms.join('') === this.textfield.value) {
        this.status = 'correct'
        window.toast('NICE !')
      }
      else {
        this.status = 'fail'
        window.toast('wrong...')
        this.textfield.helper = `${this._randoms.join('')}`
      }
    }
  }
}