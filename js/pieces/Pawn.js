import Piece from '../piece.js'
import {validate} from '../functions.js'

 export default class Pawn extends Piece {
  constructor(color, index,direction) {
    super('pawn', color, index);
    this.posibleMoves= []
    this.direction = direction
  }
  setMoves() {
    this.moves = []
    this.posibleMoves = []
    let num
    if(this.direction === 'up') {
      num = -1
    } else {
      num = 1
    }
    let y = this.y + num
    let x = this.x
    let validation = validate(x,y)
    validation = validate(this.x - 1,this.y + num)
    if(validation.respond === 'occupied' && validation.piece.color != this.color) {
      this.moves.push({move: 'kill', x:this.x - 1,y:this.y + num, piece: validation.piece, index: this.index})
    }
    else if(validation.respond === 'void') {
      this.posibleMoves.push({move: 'normal', x:this.x - 1,y:this.y + num})
    }
    validation = validate(this.x + 1,this.y + num)
    if(validation.respond === 'occupied' && validation.piece.color != this.color) {
      this.moves.push({move: 'kill', x:this.x + 1,y:this.y + num, piece: validation.piece, index: this.index})
    }
    else if(validation.respond === 'void') {
      this.posibleMoves.push({move: 'normal', x:this.x + 1,y:this.y + num})
    }
    x = this.x
    y = this.y + num
    validation = validate(x,y)
    if(validation.respond === 'void') {
      this.moves.push({move: 'normal', x:x,y:y, index: this.index})
    } 
    else {
      return
    }
    if(!(this.move)) {
      y+=num
      validation = validate(x,y)
      if(validation.respond === 'void') {
        this.moves.push({move: 'normal', x:x,y:y, index: this.index})
      }
    }
  }
}