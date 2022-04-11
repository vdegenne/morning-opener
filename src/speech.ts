/* speech system */
const spchsys = speechSynthesis
/* available voices */
let voices: SpeechSynthesisVoice[] = [];

const candidates = [ /* ordered by preference */
  // pc
  'Microsoft Mark - English (United States)',
  'Microsoft David - English (United States)',
  'Google US English',
  'Microsoft Zira - English (United States)',
  'Google UK English Female',
  'Google UK English Male',
  // mobile
  'English United States',
  'English United Kingdom',
]

export function speak (text: string, volume = .5, rate = .7) {
  return new Promise((resolve, reject) => {
    if (voices.length === 0) { reject('no voices found') }
    // get the first voice available
    const voice = voices[0]
    // console.log(`using voice "${voice.name}"`)

    const utterance = new SpeechSynthesisUtterance();
    Object.assign(utterance, { voice, text, volume, rate })
    utterance.onend = () => {
      resolve(null)
    }
    // utterance.voice = voice
    // utterance.text = text
    spchsys.speak(utterance)
  })
}

window.speechSynthesis.addEventListener('voiceschanged', ()=> {
  // we get all the english voices available first
  voices = spchsys.getVoices().filter(v=>['en-US', 'en_US', 'en-GB', 'en_GB'].includes(v.lang))
  // then we sort the voices by preference order
  voices.sort((v1, v2) => {
    const v1index = candidates.indexOf(v1.voiceURI)
    const v2index = candidates.indexOf(v2.voiceURI)
    return (v1index >= 0 ?  v1index : 99) - (v2index >= 0 ? v2index : 99)
  })
})

// For some weird badly designed reasons
// `voiceschanged` will only trigger if `getVoices` is called anywhre on mobile devices...
// Maybe because it tells the device that the application is trying to use the speechSynthesis module
// do not know.
speechSynthesis.getVoices()