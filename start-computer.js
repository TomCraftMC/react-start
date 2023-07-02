const next = document.getElementById('next')

const random_voice = ["Adam", "Bella","Josh"]

let start_state = 0

const availablePistols = ["electric-short-loud", "normal-short"]


async function signal(){
    start_state = start_state + 1
    if(start_state == 1){
        var audio = new Audio(`./src/voices/${selectedVoice}/auf-die-plätze.mp3`)
        audio.play()
    } else if(start_state == 2){
        var audio = new Audio(`./src/voices/${selectedVoice}/fertig.mp3`)
        audio.play()
        await sleep(getRandomPause(2000,3000))
        var audio = new Audio(`./src/start-sound/${startPistolType}.mp3`)
        audio.play()

    }
}
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
}  
function getRandomPause(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function selectItemFromArray(item){ 
    return item[Math.floor(Math.random()*item.length)];
}

const selectedVoice = selectItemFromArray(random_voice)
const startPistolType = selectItemFromArray(availablePistols)
next.addEventListener('click', signal)