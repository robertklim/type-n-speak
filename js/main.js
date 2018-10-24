const synth = window.speechSynthesis;

const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const pitch = document.querySelector('#pitch')
const body = document.querySelector('body')

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

// Speak
const speak = () => {
    // Check if speaking
    if (synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    // Check text field
    if (textInput.value !== '') {
        // Show background animation
        body.style.background = '#000 url(img/audio.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        
        // Get text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        
        // Speak end
        speakText.onend = e => {
            // Hide background animation
            console.log('Done speaking...');
            body.style.background = '#000';
        }

        // Speak error
        speakText.onerror = e => {
            console.error('Speak error...');
        }

        // Select voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');


        // Loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // Set rate and pitch
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
}

// Event listeners

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

voiceSelect.addEventListener('change', e => speak());