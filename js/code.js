import { drawTable, drawPieces, nextTurn } from './functions.js'
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
  console.log(pieces)
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
      console.log(moves)
      moving = true
      return
    }
  }
  if(moving) {
    for (let i = 0; i < moves.length; i++) {
      if((x > moves[i].x*60) && (x < (moves[i].x + 1)*60) && (y > moves[i].y*60) && (y < (moves[i].y + 1)*60)) {
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
})
