 import {ctx, pieces, piecesBlack, piecesWhite} from './code.js'
 
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
    if (this.color === 'white') {
      array = piecesWhite
      killsContainer = document.querySelector('.game__kills.black')
    } else {
      array = piecesBlack
      killsContainer = document.querySelector('.game__kills.white')
    }
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
    }
  }
}