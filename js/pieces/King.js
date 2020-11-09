import Piece from '../piece.js'
import { piecesBlack, piecesWhite } from '../functions.js'
import {validate, findEnemyMoves } from '../functions.js'
export let checkBlack, checkWhite

export default class King extends Piece {
  constructor(color, index) {
    super('king', color, index);
  }
  setMoves () {
    this.moves = []
    let coordenadas = {x:this.x -1, y: this.y -1}
    let num
    let validation
    let check
    let arrayEnemies, arrayAllies
    if(this.color === 'white') {
      arrayEnemies = piecesBlack
      arrayAllies = piecesWhite
    } else {
      arrayEnemies = piecesWhite
      arrayAllies = piecesBlack
    } 
    for (let i = 0; i < 4; i++) {
      if(i === 0 || i === 1) {
        num = 1
      } else {
        num = -1
      }
      for(let l = 0; l < 2; l++) {
        validation = validate(coordenadas.x,coordenadas.y)
        if(validation.respond === 'occupied' && validation.piece.color != this.color) {
          this.moves.push({move: 'kill', x:coordenadas.x,y:coordenadas.y, piece: validation.piece,index: this.index})
        }
        else if (validation.respond === 'void') {
          this.moves.push({move: 'normal', x:coordenadas.x,y:coordenadas.y, index:this.index})
        }
        if (i%2 === 0) {
          coordenadas.x += num
        } else {
          coordenadas.y += num
        }
      }
    }
    if(findEnemyMoves(this.x,this.y, arrayEnemies)) {
      check = true
    } else {
      check = false
    }
    if(this.color === 'white') {
      checkWhite = check
    } else {
      checkBlack = check
    }
    if(this.move || check) {
      return
    }
    let rooks = arrayAllies.filter(piece => (piece.name === 'rook' && !(piece.move)))
    if(rooks.length) {
      rooks.forEach(rook => {
        let xRook,xKing,x = this.x, castling = true
        if(this.x > rook.x) {
          for (let i = 1; i < 3; i++) {
            x--
            if(findEnemyMoves(x,this.y,arrayEnemies) || validate(x,this.y).respond === 'occupied') {
              castling = false
              break
            }
          }
          xRook= this.x -1
          xKing= this.x -2
        } else {
          for (let i = 1; i < 4; i++) {
            x++
            if((findEnemyMoves(x,this.y,arrayEnemies) && i < 3) || validate(x,this.y).respond === 'occupied') {
              castling = false
              break
            }
          }
          xRook= this.x + 1
          xKing= this.x + 2
        }
        if(castling) {
          console.log()
          this.moves.push({
            move: 'castling',
            index: this.index,
            xRook: xRook, 
            x: xKing, 
            y:this.y,
            rook: rook
          })
        }
      })
    }
  }
}