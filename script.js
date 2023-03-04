const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.querySelector('.start-btn')
const game_container = document.querySelector('.game-container')
const insect_imgs = document.querySelectorAll('.insect-img')
const timeEl = document.querySelector('.time')
const scoreEl = document.querySelector('.score')
const message = document.querySelector('.message')
const modal_btns = document.querySelector('.modal-buttons')
const exit_game = document.querySelector('.exit-game')


document.querySelector(".new-game").addEventListener("click", function(){   // reload page for new game 
    window.location.reload();
});

let seconds = 10
let score = 0
let selected_insect = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_insect_btns.forEach(btn => { 
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

insect_imgs.addEventListener("mouseleave", () => {  // ! BUG insect img not a function
    insect_imgs.style.transform = "rotate(-360deg)"
  });

function startGame() {
    setInterval(decrimentTime, 1000)
}

function decrimentTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    if (seconds < 1) {
        message.classList.add('visible')
        message.textContent = `YOUR SCORE IS: ${score}`
        clearInterval(timer)
    } else {
        seconds--
    }
}

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `
        <img src="${selected_insect.src}" 
        alt="${selected_insect.alt}" 
        style="transform: rotate(${Math.random() * 360}deg)" /> `

    insect.addEventListener('click', catchInsect)
    if (seconds < 1){
        insect.innerHTML = ""
        modal_btns.style.display = "block"
    }
    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    if(seconds == 0) {
        setTimeout(() => this.remove(), 2000)
    }
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1300)
}

function increaseScore() {
    if(seconds !==0){
        score++
    }
    scoreEl.innerHTML = `score: ${score}`
}


document.addEventListener("contextmenu", function(event){    // right click disable 
    event.preventDefault();
}, false);