function onclickLogo(){
    playTrack();
    audioButton();
    let audio_btn = document.getElementById('backtrack');

    logo = document.getElementById('logo-div');
    logo.classList.add('fade-out-element');
    setTimeout(() => logo.remove(), 2000);

}

function playTrack(){
    var backtrack = document.getElementById('backtrack');
    backtrack.play();
}

function playButton(){
    var audio_btn = document.getElementById('audio-button');
    var track = document.getElementById('backtrack');
    
    if (audio_btn.classList.contains('play-button')){
        audio_btn.classList.add('stop-button');
        audio_btn.classList.remove('play-button');
        track.pause();
    } else {
        audio_btn.classList.add('play-button');
        audio_btn.classList.remove('stop-button');
        track.play();
    }
}

function selfDestroy(el) {
    var element = el;
    element.remove();
}

function audioButton(){
    var tag = document.createElement('button');
    tag.setAttribute('id', 'audio-button');
    tag.setAttribute('class', 'play-button');
    tag.classList.add('fade-in-element');
    tag.setAttribute('onclick', 'playButton()');
    document.body.appendChild(tag);
}
