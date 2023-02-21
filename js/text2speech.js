const textarea = document.querySelector('textarea'),
    voicelist = document.querySelector('select'),
    speechbtn = document.querySelector('button');


let synth = speechSynthesis;
let isSpeaking = true;

function voices() {
    for (let voice of synth.getVoices()) {
        // console.log(voice);
        // selecting "Google US English" Voice by default
        let selected = voice.name === "Google US English" ? "selected" : "";
        //creating an option tag with passing voice name and voice language
        let option = `<option value = "${(voice.name)}" ${selected}> ${voice.name} (${voice.lang})</option>`
        voicelist.insertAdjacentHTML("beforeend", option); //inserting option tag beforeend of select tag
    }
}

synth.addEventListener("voiceschanged", voices);

function textTospeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        //select voice selected by user
        if (voice.name === voicelist.value) {
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance); //speak the utterance

}

function speechfunction() {
    if (textarea !== "") {
        //if click button multiple times
        if (!synth.speaking) {
            textTospeech(textarea.value);
        }
        //pause speaking if length is >80
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechbtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechbtn.innerText = "Resume Speech";
            }

            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechbtn.innerText = " Convert To Speech";
                }
            });
        } else {
            speechbtn.innerText = " Convert To Speech";
        }
    }
};