const synth = window.speechSynthesis;

const textForem = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const pitch = document.querySelector('#pitch')

let voices = []

const getVoices = () => {
    voices = synth.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });

    // Initialize Materialize FormSelect
    options = {}
    var elems = document.querySelectorAll('#voice-select');
    var instances = M.FormSelect.init(elems, options);

}

getVoices();

if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}
