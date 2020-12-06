function playTrack(){
    var backtrack = document.getElementById('backtrack')
    backtrack.play()
}
function playButton(){
    var audio_btn = document.getElementById('audio-button');
    if (audio_btn.classList.contains('play-button')){
        audio_btn.classList.add('stop-button');
        audio_btn.classList.remove('play-button');
        return False
    } else {
        audio_btn.classList.add('play-button');
        audio_btn.classList.remove('stop-button');
    }
}