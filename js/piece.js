 import { ctx } from './code.js'
 import { pieces, piecesBlack, piecesWhite } from './functions.js'
 export let countBlack = {bishop: 0, knight: 0, pawn: 0, queen: 0, rook: 0}
 export let countWhite = {bishop: 0, knight: 0, pawn: 0, queen: 0, rook: 0}
 
 export default class Piece {
  constructor(piece, color, index) {
    this.name = piece
    this.index = index
    this.color = color
    this.move = false
    this.moves = []
    this.image = new Image()
    const imageUrl = `sources/${this.color}_${this.name}.png`
    this.image.src = imageUrl
    this.carga = false
  }
  
  draw(x, y) {
    this.x = x
    this.y = y
    if(!this.carga) {
      this.image.onload = () => ctx.drawImage(this.image,x*60 ,y*60)
      this.carga = true
    } else {
      ctx.drawImage(this.image,x*60 ,y*60)
    }
  }
  delete() {
    let array, killsContainer
    let pointsBlack = 0, pointsWhite = 0
    let score = document.getElementById('score')
    if(score) {
      score.parentNode.removeChild(score)
    }
    if (this.color === 'white') {
      array = piecesWhite
      killsContainer = document.querySelector('.game__kills.black')
    } else {
      array = piecesBlack
      killsContainer = document.querySelector('.game__kills.white')
    }
    countBlack = {bishop: 0, knight: 0, pawn: 0, queen: 0, rook: 0}
    countWhite = {bishop: 0, knight: 0, pawn: 0, queen: 0, rook: 0}
    piecesWhite.forEach(piece => {
      if(piece.name === 'bishop') {
        countWhite.bishop++
      }
      else if(piece.name === 'knight') {
        countWhite.knight++
      }
      else if(piece.name === 'pawn') {
        countWhite.pawn++
      }
      else if(piece.name === 'queen') {
        countWhite.queen++
      }
      else if(piece.name === 'rook') {
        countWhite.rook++
      }
    })
    piecesBlack.forEach(piece => {
      if(piece.name === 'bishop') {
        countBlack.bishop++
      }
      else if(piece.name === 'knight') {
        countBlack.knight++
      }
      else if(piece.name === 'pawn') {
        countBlack.pawn++
      }
      else if(piece.name === 'queen') {
        countBlack.queen++
      }
      else if(piece.name === 'rook') {
        countBlack.rook++
      }
    })
    killsContainer.appendChild(this.image)

    for (let i = 0; i < array.length; i++) {
      if(array[i].index === this.index) {
        array.splice(i,1)
        break
      }
    }
    pieces.splice(this.index,1)
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].index = i
      if(pieces[i].name === 'king') {}
      else if(pieces[i].color === 'white') {
        pointsWhite += pieces[i].value
      } else {
        pointsBlack += pieces[i].value
      }
    }
    let element, diferencia
    if(pointsBlack > pointsWhite) {
      element = document.createElement('span')
      diferencia = pointsBlack - pointsWhite
      element.innerHTML = '+' + diferencia
      element.id = 'score'
      document.querySelector('.game__kills.black').appendChild(element)
    } 
    else if(pointsBlack < pointsWhite) {
      element = document.createElement('span')
      diferencia = pointsWhite - pointsBlack
      element.innerHTML = '+' + diferencia
      element.id = 'score'
      document.querySelector('.game__kills.white').appendChild(element)
    }
  }
}