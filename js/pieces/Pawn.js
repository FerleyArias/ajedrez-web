import Piece from '../piece.js'
import {validate} from '../functions.js'

 export default class Pawn extends Piece {
  constructor(color, index,direction) {
    super('pawn', color, index);
    this.posibleMoves= []
    this.direction = direction
    this.value = 1
    this.specialMove = false
  }
  setMoves() {
    this.moves = []
    this.posibleMoves = []
    let num,yPromotion
    if(this.direction === 'up') {
      num = -1
      yPromotion = 0
    } else {
      num = 1
      yPromotion = 7
    }
    let y = this.y + num
    let x = this.x
    let move
    let validation
    for (let i = 0; i < 2; i++) {
      let numx
      if(i === 0) {
        numx = -1
      } else {
        numx = 1
      }
      validation = validate(this.x + numx,this.y + num)
      if(validation.respond === 'occupied' && validation.piece.color != this.color) {
        move = {
          move: 'kill', 
          x:this.x + numx,
          y:this.y + num, 
          piece: validation.piece, 
          index: this.index,
          promotion: false
        }
        if(this.y + num === yPromotion) {
          move.promotion = true 
        }
        this.moves.push(move)
      }
      else if(validation.respond === 'void') {
        this.posibleMoves.push({move: 'normal', x:this.x - 1,y:this.y + num})
      }
      validation = validate(this.x + numx,this.y)
      if((validation.respond === 'occupied' && validation.piece.color != this.color) && validation.piece.specialMove) {
        move = {
          move: 'kill', 
          x:this.x + numx,
          y:this.y + num, 
          piece: validation.piece, 
          index: this.index,
          promotion: false
        }
        if(this.y + num === yPromotion) {
          move.promotion = true 
        }
        this.moves.push(move)
      }
    }
    x = this.x
    y = this.y + num
    validation = validate(x,y)
    if(validation.respond === 'void') {
      move = {
        move: 'normal', 
        x:x,
        y:y, 
        index: this.index,
        promotion: false
      }
      if(this.y + num === yPromotion) {
        move.promotion = true
      }
      this.moves.push(move)
    } 
    else {
      return
    }
    if(!(this.move)) {
      y+=num
      validation = validate(x,y)
      if(validation.respond === 'void') {
        move = {
          move: 'normal', 
          x:x,
          y:y, 
          index: this.index,
          specialMove: true
        }
        this.moves.push(move)
      }
    }
  }
}