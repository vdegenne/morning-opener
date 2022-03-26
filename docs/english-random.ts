import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import words from '../docs/data/english-words.json'

@customElement('english-random')
export class EnglishRandom extends LitElement {
  static styles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .word {
    margin: 6px;
    cursor: pointer;
  }
  `
  render() {
    return html`
    <div class=word @click=${_=>this.openOxfordLink('literally')}>literally</div>
    <div class=word @click=${_=>this.openOxfordLink('hour')}>hour</div>
    <div class=word @click=${_=>this.openOxfordLink('unbelievable')}>unbelievable</div>
    <div class=word @click=${_=>this.openOxfordLink('organizational')}>organizational</div>
    <mwc-button raised @click=${this.openNew} icon=casino
      style="margin-top:24px">open new</mwc-button>
    `
  }

  openNew () {
    const random = words[Math.random() * words.length|0]
    this.openOxfordLink(random)
  }

  openOxfordLink(word) {
    window.open(`https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURIComponent(word)}`, '_blank')
  }
}