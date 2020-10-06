import Piece from '../piece.js'
import {validate} from '../functions.js'


export default class Queen extends Piece {
  constructor(color, index) {
    super('queen', color, index);
    this.value = 9
  }
  setMoves() {
    this.moves = []
    for (let i = 0; i < 2; i++) {
      let num1,num2
      if (i === 0) {
        num1 = 1
      } else {
        num1 = -1
      }
      for (let l = 0; l < 2; l++) {
        let coordenadas = {x:this.x,y:this.y}
        let siguiente = true
        while (siguiente) {
          if(l === 0) {
            coordenadas.x += num1
          } else {
            coordenadas.y += num1
          }
          let validation = validate(coordenadas.x,coordenadas.y)
          if(validation.respond === 'out') {
            siguiente = false
          }
          else if(validation.respond === 'void') {
            this.moves.push({
              move: 'normal',
              x: coordenadas.x,
              y: coordenadas.y,
              index: this.index
            })
          } 
          else if(validation.piece.color != this.color ) {
            this.moves.push({
              move: 'kill',
              x: coordenadas.x,
              y: coordenadas.y,
              piece: validation.piece,
              index: this.index
            })
            siguiente = false
          }
          else {
            siguiente = false
          }
        }
        coordenadas = {x:this.x,y:this.y}
        siguiente = true
        if (l === 0) {
          num2 = 1
        } else {
          num2 = -1
        }
        while (siguiente) {
          coordenadas.x += num1
          coordenadas.y += num2
          let validation = validate(coordenadas.x,coordenadas.y)
          if(validation.respond === 'out') {
            siguiente = false
          }
          else if(validation.respond === 'void') {
            this.moves.push({
              move: 'normal',
              x: coordenadas.x,
              y: coordenadas.y,
              index: this.index
            })
          } 
          else if(validation.piece.color != this.color ) {
            this.moves.push({
              move: 'kill',
              x: coordenadas.x,
              y: coordenadas.y,
              piece: validation.piece,
              index: this.index
            })
            siguiente = false
          }
          else {
            siguiente = false
          }
        }
      }
    }
  }
}