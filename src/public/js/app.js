import Board from './board.js'
import ChessEngine from './chess.js'
import Colors from './colors.js'

import { isEven, isOdd, rgbToHex } from './util.js'
import { pieceReprs } from './constants.js'

const engine = new ChessEngine()

const form = document.querySelector('form')
const output = document.querySelector('.output')
const message = document.querySelector('.message')
const fromInput = document.querySelector('input[name="from"]')
const toInput = document.querySelector('input[name="to"]')
const rows = document.querySelector('.rows')
const cols = document.querySelector('.cols')
const history = document.querySelector('.history')

let selected = null

function getTileContents(id) {
  const tile = engine.board.getTileContents(id)
  if(!tile) return ''
  const key = tile.toString()
  return pieceReprs[key]
}

function getTileColor(row, col) {
  return (isEven(row) && isEven(col)) || (isOdd(row) && isOdd(col)) ? Colors.White : Colors.Black
}

function getSelectedColor(tile) {
  if(rgbToHex(tile.style.background) === Colors.White) return Colors.LightRed
  if(rgbToHex(tile.style.background) === Colors.Black) return Colors.DarkRed
  if(rgbToHex(tile.style.background) === Colors.LightRed) return Colors.White
  if(rgbToHex(tile.style.background) === Colors.DarkRed) return Colors.Black
}

function onTileHighlight(event) {
  event.preventDefault()
  event.target.style.background = getSelectedColor(event.target)
}

function showCheckMessage() {
  message.classList.toggle('message--visible')
  const timeout = setTimeout(function () {
    message.classList.toggle('message--invisible')
    clearTimeout(timeout)
  }, 2000)
}

function onTileSelect(event) {
  update()

  if(selected) {
    const move = engine.makeMove(selected.id, event.target.id)
    console.log(move)
    if(move.valid && move.check) showCheckMessage()
    selected = null
    update()
  } else {
    selected = event.target
    const tile = engine.board.getTileContents(selected.id)
    if(!tile) return
    const moves = tile.getAvaliableMoves(engine.board, selected.id)
    moves.forEach(move => (document.getElementById(move).style.background = Colors.Yellow))
  }

}

function updateMoveHistory() {
  history.innerHTML = ""
  engine.history.forEach(move => {
    const div = document.createElement('div')
    div.classList.add('Hbox')
    div.innerHTML = move
    history.appendChild(div)
  })
}

function updateBoardDisplay() {
  output.innerHTML = ''
  for(let row = 0; row < engine.board.size; row++) {
    for(let col = 0; col < engine.board.size; col++) {
      const id = Board.getId(row, col)
      const div = document.createElement('div')
      div.id = id
      div.style.background = getTileColor(row, col)
      div.innerHTML = getTileContents(id)
      div.addEventListener('click', onTileSelect, false)
      div.addEventListener('contextmenu', onTileHighlight, false)
      output.appendChild(div)
    }
  }
}

function addEventListeners() {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    event.stopPropagation()
    const data = new FormData(form)
    const from = data.get('from')
    const to = data.get('to')
    engine.makeMove(from, to)
    updateBoardDisplay()
    updateMoveHistory()
    fromInput.value = ''
    toInput.value = ''
  })
}

function fillRowLabels() {
  for(let i = 8; i > 0; i--) {
    const div = document.createElement('div')
    div.textContent = i.toString()
    rows.appendChild(div)
  }
}

function fillColLabels() {
  for(let i = 0; i < 8; i++) {
    const div = document.createElement('div')
    div.textContent = String.fromCharCode(65 + i)
    cols.appendChild(div)
  }
}

function update() {
  updateBoardDisplay()
  updateMoveHistory()
}

function main() {
  fillRowLabels()
  fillColLabels()
  update()
  addEventListeners()
}

main()