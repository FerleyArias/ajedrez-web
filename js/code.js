import { drawTable, drawPieces, nextTurn, drawMoves, promotion } from './functions.js'
export const canvas = document.getElementById('table')
export const ctx = canvas.getContext('2d')
export let pieces = [], piecesWhite = [], piecesBlack = [], moves = [], turn, moving

drawTable()

const btnStart = document.getElementById('start')
btnStart.addEventListener('click', () => {
  pieces = [], piecesWhite = [], piecesBlack = []
  drawTable()
  drawPieces()
  turn = 'white'
  piecesWhite.forEach(piece => {
    piece.setMoves()
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
      if((x > moves[i].x*60) && (x < (moves[i].x + 1)*60) && (y > moves[i].y*60) && (y < (moves[i].y + 1)*60)) {
        if(moves[i].promotion) {
          let list, container = document.querySelector('.promotion'),promotionOptions
          let promotionData = {
            x: moves[i].x,
            y: moves[i].y,
            pawn: pieces[moves[i].index],
            color: turn
          }
          container.classList.remove('ocult')
          if(turn === 'white') {
            list = document.querySelector('.promotion__list.white')
          } else {
            list = document.querySelector('.promotion__list.black')
          }
          list.classList.remove('ocult')
          promotionOptions = list.querySelectorAll('button')
          promotionOptions.forEach(piece => {
            piece.addEventListener('click', event => {
              promotionData.piece = event.target.attributes[1].value
              promotion(promotionData)
              container.classList.add('ocult')
              list.classList.add('ocult')
            })
          })
          container.addEventListener('click', () => {
            if(confirm('Seguro que no quieres promocinar a tu peon?')) {
              container.classList.add('ocult')
              list.classList.add('ocult')
            }
          })
        }
        pieces[moves[i].index].x = moves[i].x 
        pieces[moves[i].index].y = moves[i].y
        pieces[moves[i].index].move = true
        if(moves[i].move === 'kill') {
          moves[i].piece.delete()
        }
        else if (moves[i].move === 'castling') {
          moves[i].rook.x = moves[i].xRook
          moves[i].rook.y = moves[i].y
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
        moving = false 
        moves = []
        nextTurn(turn)
        return
      }
    }
  }
  moves = []
  moving = false
  drawTable()
  pieces.forEach(piece => {
    piece.draw(piece.x,piece.y)
  })
})
