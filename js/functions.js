import Bishop from './pieces/Bishop.js'
import King from './pieces/King.js'
import Knight from './pieces/Knight.js'
import Pawn from './pieces/Pawn.js'
import Queen from './pieces/Queen.js'
import Rook from './pieces/Rook.js'
import { checkBlack, checkWhite } from './pieces/King.js'
import { ctx,pieces, piecesBlack,piecesWhite, canvas } from './code.js'
export let kingBlack, kingWhite, pointsBlack, pointsWhite
let initialTable = ['rook', 'knight', 'bishop' ,'queen', 'king', 'bishop', 'knight', 'rook']
export function drawTable () {
  canvas.width = canvas.width
  let x = 0
  let y = 0
  let par = 0
  for (let i = 1; i <= 64; i++) {
    if (i%2 == par) {
      ctx.fillStyle = "#444"  
    } else {
      ctx.fillStyle = "#CCC"
    }
    ctx.fillRect(x*60,y*60,60,60);
    x++
    if(i%8 == 0) {
      x = 0
      y++
      if(par == 0) {
        par = 1
      } else {
        par = 0
      }
    }
  }
}
export function drawPieces () {
  let count=0,color
  let x=0
  let y=0
  for (let i = 0; i <= initialTable.length; i++) {
    let piece,direction
    if(count===0) {
      color= 'black'
      direction = 'down'
    } else {
      color= 'white'
      direction = 'up'
    }
    if(initialTable[i] === 'rook') {
      piece= new Rook(color, pieces.length)
    }
    else if(initialTable[i] === 'knight') {
      piece= new Knight(color, pieces.length)
    }
    else if(initialTable[i] === 'bishop') {
      piece= new Bishop(color, pieces.length)
    }
    else if(initialTable[i] === 'queen') {
      piece= new Queen(color, pieces.length)
    }
    else if(initialTable[i] === 'king') {
      piece= new King(color, pieces.length)
      if (color === 'white') {
        kingWhite = piece
      } else {
        kingBlack = piece
      }
    }
    if(i< initialTable.length) {
      pieces.push(piece)
      piece.draw(x,y)
      x++
    }
    else {
      if(count === 0) {
        y++
        i=-1
      } else {
        y-=1
      }
      x = 0
      for (let l = 0; l < 8; l++) {
        piece = new Pawn(color, pieces.length, direction)
        pieces.push(piece)
        piece.draw(x,y)
        x++
      }
      count = 1
      x=0
      y=7
    }
  }
  pieces.forEach( piece => {
    if(piece.color === 'white') {
      piecesWhite.push(piece)
    } else {
      piecesBlack.push(piece)
    }
  })
}
export function drawMoves(moves) {
  moves.forEach(move => {
    ctx.beginPath()
    if(move.move === 'kill') {
      ctx.fillStyle = '#FF000055'
    } else {
      ctx.fillStyle = '#00000055'
    }
    ctx.arc((move.x*60)+30,(move.y*60)+30,15,0,(Math.PI/180)*360,true);
    ctx.fill();
  })
}
export function validate(x,y) {
  if((x > 7||x < 0) || (y > 7||y < 0)) {
    return {respond: 'out'}
  }
  for (let i = 0; i < pieces.length; i++) {
    if(pieces[i].x === x && pieces[i].y === y) {
      return {respond: 'occupied', piece: pieces[i]}
    }
  }
  return {respond:'void'}
}
export function findEnemyMoves(x,y,array) {
  for (let i = 0; i < array.length; i++) {
      if(array[i].name === 'pawn') {
        for (let l = 0; l < array[i].posibleMoves.length; l++) {
          if(array[i].posibleMoves[l].x === x && array[i].posibleMoves[l].y === y) {
            return true
          }
        }
      }
      for (let l = 0; l < array[i].moves.length; l++) {
        if(array[i].moves[l].x === x && array[i].moves[l].y === y) {
          return true
        }
      }
    }
  return false
};

export function validateMoves(arrayAllies, arrayEnemies, color) {
  let king
  if(color === 'white') {
    king = kingWhite
  } else {
    king = kingBlack
  }
  arrayAllies.forEach(piece => {
    let xAlly = piece.x
    let yAlly = piece.y
    for (let i = 0; i < piece.moves.length; i++) {
      let xEnemy, yEnemy, pieceKilled, kill = false
      if(piece.moves[i].move === 'kill') {
        xEnemy = piece.moves[i].piece.x
        yEnemy = piece.moves[i].piece.y
        piece.moves[i].piece.x = -3
        piece.moves[i].piece.y = -3
        kill = true
        pieceKilled = piece.moves[i].piece
      }
      piece.x = piece.moves[i].x
      piece.y = piece.moves[i].y
      arrayEnemies.forEach( enemy => {
        enemy.setMoves()
      })
      if(findEnemyMoves(king.x,king.y,arrayEnemies)) {
        piece.moves.splice(i,1)
        i--
      }
      if(kill) {
        pieceKilled.x = xEnemy
        pieceKilled.y = yEnemy
      }
    }
    piece.x = xAlly
    piece.y = yAlly
  })
}
export function nextTurn(color) {
  let arrayAllies, arrayEnemies, colorEnemy, check, count = 0
  if(color === 'white') {
    arrayEnemies = piecesBlack
    arrayAllies = piecesWhite
    colorEnemy = 'black'
  } else {
    arrayEnemies = piecesWhite
    arrayAllies = piecesBlack
    colorEnemy = 'white'
  }
  arrayEnemies.forEach(piece => {
    piece.setMoves()
  })
  arrayAllies.forEach(piece => {
    piece.setMoves()
  })
  if (color === 'white') {
    check = checkWhite
  } else {
    check = checkBlack
  }
  validateMoves(arrayAllies, arrayEnemies, color)
  arrayAllies.forEach(piece => {
    count += piece.moves.length
  })
  setTimeout(() => {
    let msg
    if(check && count === 0) {
      msg = `the winer is ${colorEnemy}`
    }
    else if (count === 0) {
      msg = 'empate'
    }
    if(msg) {
      alert(msg)
      drawTable()
    }
  },1)
}

export function promotion(promotionData) {
  let promotionPiece,colorEnemy
  if (promotionData.piece === 'rook') {
    promotionPiece= new Rook(promotionData.color, pieces.length)
  } 
  else if (promotionData.piece === 'bishop') {
    promotionPiece= new Bishop(promotionData.color, pieces.length)
  } 
  else if (promotionData.piece === 'queen') {
    promotionPiece= new Queen(promotionData.color, pieces.length)
  } 
  else {
    promotionPiece= new Knight(promotionData.color, pieces.length)
  }
  promotionPiece.draw(promotionData.x, promotionData.y)
  pieces.push(promotionPiece)
  promotionData.pawn.delete()
  console.log(pieces);
  drawTable()
  pieces.forEach(piece => {
    piece.draw(piece.x, piece.y)
  })
  console.log(pieces);
  if (promotionData.color === 'white') {
    piecesWhite.push(promotionPiece)
    colorEnemy = 'black'
  } else {
    piecesBlack.push(promotionPiece)
    colorEnemy = 'white'
  }
  nextTurn(colorEnemy)
}

export function limpiar() {
  let list = document.querySelectorAll('.game__kills') 
  list.forEach(item => {
    item.innerHTML = ''
  })
}