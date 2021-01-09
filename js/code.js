import { drawTable, drawPieces, nextTurn, drawMoves, promotion, limpiar, timer } from './functions.js'
export const canvas = document.getElementById('table')
export const ctx = canvas.getContext('2d')
export const $players = document.querySelectorAll('.player')
export const $btnStart = document.getElementById('start')
export let moves = [], turn
export let playerWhite = '', playerBlack = ''
import { pieces, piecesBlack, piecesWhite } from './functions.js'

drawTable()

$btnStart.addEventListener('click', () => {
  $btnStart.classList.add('ocult')
  $players.forEach(player => {
    const decitions = player.querySelector('.player__decitions')
    const playerForm = player.querySelector('.player__form')
    let name = player.querySelector('.player__form input').value
    const nameTag = player.querySelector('.player__name')
    nameTag.classList.remove('ocult')
    playerForm.classList.add('ocult')
    if(!name) {
      player.attributes[1].value === 'white'? name = 'Player 1' : name = 'Player 2' 
    }
    nameTag.innerHTML = name
    if(player.attributes[1].value === 'white') {
      playerWhite =  name
    } else {
      playerBlack =  name
    }
    decitions.classList.remove('ocult')
  })
  drawTable()
  drawPieces()
  turn = 'white'
  piecesWhite.forEach(piece => {
    piece.setMoves()
  })
  timer(turn)
})

$players.forEach(player => {
  const decitions = player.querySelector('.player__decitions')
  decitions.querySelector('.surrender').addEventListener('click', e => {
    if(e.target.attributes[1].value  != 'white') {
      alert(`el ganador es ${playerWhite}`)
    } else {
      alert(`el ganador es ${playerBlack}`)
    }
    drawTable()
    limpiar()
  })
})

canvas.addEventListener('click', (event) => {
  let x = event.layerX
  let y = event.layerY
  let arrayAllies, arrayEnemies
  if(turn === 'white') {
    arrayAllies = piecesWhite
    arrayEnemies = piecesBlack
  } else {
    arrayAllies = piecesBlack
    arrayEnemies = piecesWhite
  }
  for (let i = 0; i < arrayAllies.length; i++) {
    if((x > arrayAllies[i].x*60) && (x < (arrayAllies[i].x + 1)*60) && (y > arrayAllies[i].y*60) && (y < (arrayAllies[i].y + 1)*60)) {
      moves = arrayAllies[i].moves
      drawTable()
      pieces.forEach(piece => {
        piece.draw(piece.x,piece.y)
      })
      drawMoves(moves)
      return
    }
  }
  if(moves.length > 0) {
    for (let i = 0; i < moves.length; i++) {
      let move = moves[i]
      if((x > move.x*60) && (x < (move.x + 1)*60) && (y > move.y*60) && (y < (move.y + 1)*60)) {
        if(move.promotion) {
          let list, container = document.querySelector('.promotion'),promotionOptions
          let promotionData = {
            x: move.x,
            y: move.y,
            pawn: pieces[move.index],
            color: turn
          }
          container.classList.remove('ocult')
          if(turn === 'white') {
            list = document.querySelector('.promotion__list.white')
          } else {
            list = document.querySelector('.promotion__list.black')
          }
          list.classList.remove('ocult')
          setTimeout(() => {
            list.classList.add('inUp')
          },1)
          promotionOptions = list.querySelectorAll('button')
          promotionOptions.forEach(piece => {
            piece.addEventListener('click', event => {
              promotionData.piece = event.target.attributes[1].value
              promotion(promotionData)
              list.classList.remove('inUp')
              setInterval(() => {
                container.classList.add('ocult')
                list.classList.add('ocult')
              },500)
            })
          })
          container.addEventListener('click', () => {
            if(confirm('Seguro que no quieres promocinar a tu peon?')) {
              list.classList.remove('inUp')
              setInterval(() => {
                container.classList.add('ocult')
                list.classList.add('ocult')
              },500)
            }
          })
        }
        if(move.specialMove) {
          pieces[move.index].specialMove = true
        }
        pieces[move.index].x = move.x 
        pieces[move.index].y = move.y 
        pieces[move.index].move = true
        if(move.move === 'kill') {
          move.piece.delete()
        }
        else if (move.move === 'castling') {
          move.rook.x = move.xRook
          move.rook.y = move.y
        }
        drawTable()
        pieces.forEach(piece => {
          piece.draw(piece.x,piece.y)
        })
        if (turn === 'white') {
          turn = 'black'
        } else {
          turn = 'white'
        }
        moves = []
        nextTurn(turn)
        return
      }
    }
  }
  moves = []
  drawTable()
  pieces.forEach(piece => {
    piece.draw(piece.x,piece.y)
  })
})
