import Piece from '../piece.js'
import {validate} from '../functions.js'

export default class Knight extends Piece {
  constructor(color, index) {
    super('knight', color, index);
    this.value = 3
  }
  setMoves() {
    this.moves = []
    for (let i = 0; i < 2; i++) {
      let num 
      if (i === 0) {
        num = 2
      } else {
        num = -2
      }
      for (let l = 0; l < 2; l++) {
        let coordenadas = {x: this.x, y: this.y}
        let validation
        if(l === 0) {
          coordenadas.x+= num
          coordenadas.y+= 1
        } else {
          coordenadas.x+= 1
          coordenadas.y+= num
        }
        validation = validate(coordenadas.x, coordenadas.y)
        if(validation.respond === 'void') {
          this.moves.push({
            move: 'normal',
            x: coordenadas.x,
            y: coordenadas.y,
            index: this.index
          })
        } 
        else if(validation.respond === 'occupied' && validation.piece.color != this.color ) {
          this.moves.push({
            move: 'kill',
            x: coordenadas.x,
            y: coordenadas.y,
            piece: validation.piece,
            index: this.index
          })
        }
        if(l === 0) {
          coordenadas.y-= 2
        } else {
          coordenadas.x-= 2
        }
        validation = validate(coordenadas.x, coordenadas.y)
        if(validation.respond === 'void') {
          this.moves.push({
            move: 'normal',
            x: coordenadas.x,
            y: coordenadas.y,
            index: this.index
          })
        } 
        else if(validation.respond === 'occupied' && validation.piece.color != this.color ) {
          this.moves.push({
            move: 'kill',
            x: coordenadas.x,
            y: coordenadas.y,
            piece: validation.piece,
            index: this.index
          })
        }
      }
    }
  }
}