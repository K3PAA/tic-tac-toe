const specialNum = [
  'zeroth',
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth',
  'seventeenth',
  'eighteenth',
  'nineteenth',
]
const decaNum = [
  'twent',
  'thirt',
  'fort',
  'fift',
  'sixt',
  'sevent',
  'eight',
  'ninet',
]

const grid = document.querySelector('#boardSizes')
const bestOf = document.querySelector('#bestOf')
const gameTime = document.querySelector('#gameTime')

const gameDisplay = document.querySelector('.game-display')
const menu = document.querySelector('.menu')
const modal = document.querySelector('.modal')

const playButtons = document.querySelectorAll('.play-btn')
const resetButton = document.querySelector('.reset-btn')
const playWithAI = document.querySelector('.ai-btn')

const currentRoundNumberDisply = document.querySelector('.round-amount')
const scoreTexts = document.querySelectorAll('.score-text')

resetButton.addEventListener('click', () => {
  game.createBoard()
  game.roundActive = true
})

const userWidth =
  window.innerWidth < 800 ? (window.innerWidth < 500 ? 50 : 95) : 125

const game = new Game({
  bestOf: 3,
  timeForMove: 5,
  tileSize: userWidth,
  boardHeight: 3,
  boardWidth: 3,
  decaNum: decaNum,
  specialNum: specialNum,
})

const gameAnimation = () => {
  requestAnimationFrame(gameAnimation)

  if (game.roundActive) {
    game.createBoard()
    game.drawTiles()

    if (game.player.isMoving) {
      scoreTexts.forEach((text) => {
        if (text.dataset.type === 'player') {
          text.classList.add('playing')
        } else text.classList.remove('playing')
      })
    } else {
      scoreTexts.forEach((text) => {
        if (text.dataset.type === 'enemy') {
          text.classList.add('playing')
        } else text.classList.remove('playing')
      })
    }
  }
}

gameAnimation()

playButtons.forEach((button) => {
  button.addEventListener('click', () => {
    menu.classList.add('off')
    modal.classList.add('off')

    let width, height

    switch (grid.value) {
      case '3x3':
        width = 3
        height = 3
        break
      case '4x4':
        width = 4
        height = 4
        break
    }

    game.boardHeight = height
    game.boardWidth = width
    game.staticTimeForMove = gameTime.value ? gameTime.value : 5
    game.totalRounds = bestOf.value

    game.resetBoard()
  })
})

menu.addEventListener('transitionend', () => {
  gameDisplay.style.opacity = 1
})
