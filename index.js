const click_detect = document.getElementById('click_detect')
const h1 = document.getElementById('h1')

const random_voice = ["Adam", "Bella","Josh"]

let start_state = 0
let system_state = 0

const availablePistols = ["electric-short-loud", "normal-short"]
let start_stamp = null
let end_stamp = null
rnd_pause = null
active = true


async function signal(){
        rnd_pause = getRandomPause(2000,4000)
        await sleep(rnd_pause)
        var audio = new Audio(`../src/start-sound/${startPistolType}.mp3`)
        audio.play()
        start_stamp = Date.now()
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
async function logic(){
    if(system_state == 0){
        
        system_state = 1
        h1.innerHTML = "Klicke beim Signal"
        signal()
    } else {
        end_stamp = Date.now()
        if(end_stamp == null || rnd_pause == null){
            return
        } else if(end_stamp != null && start_stamp == null){
            active = false
            h1.classList.add("red")
            h1.innerHTML = "Fehlstart"
            var audio = new Audio(`../src/start-sound/${startPistolType}.mp3`)
            await sleep(getRandomPause(200,400))
            audio.play()
            await sleep(5000) 
            h1.innerHTML = "Klicke zum Starten"
            h1.classList.remove("red")
            start_stamp = null
            end_stamp = null
            system_state = 0
            active = true
        }else if(system_state == 1){
            if(active == false){
                return
            }
            active = false
            h1.innerHTML = String(end_stamp-start_stamp) + "ms"
            if(end_stamp-start_stamp <=100) {
                h1.classList.add("red")
                var audio = new Audio(`../src/start-sound/${startPistolType}.mp3`)
                await sleep(getRandomPause(200,400))
                audio.play()
                await sleep(getRandomPause(100,300))
                audio.play()
            } else {
                h1.classList.remove("red") 
            }
            await sleep(5000) 
            h1.innerHTML = "Klicke zum Starten"
            h1.classList.remove("red")
            start_stamp = null
            end_stamp = null
            system_state = 0
            active = true

        }
    }
}
click_detect.addEventListener('click', logic)
