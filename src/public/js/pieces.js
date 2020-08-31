import Board from './board.js'
import { toNormalCase } from './util.js'

class Piece {

  moved = false

  constructor(name, notation, color) {
    this.name = name
    this.notation = notation
    this.color = color
  }

  getRow(board, id) {
    let moves = []

    const pos = Board.getPosition(id)
    if(pos == null) return moves
    const { row, col } = pos
    const horizontal = board.getRow(row)

    for(let delta = -1; delta < 2; delta += 2) {
      for(let i = 1; i < horizontal.length; i++) {
        const index = col + (delta * i)
        if(index >= 0 && index < horizontal.length) {
          if(horizontal[index] === false) {
            moves.push(Board.getId(row, index))
          } else {
            if(horizontal[index].color !== this.color) {
              moves.push(Board.getId(row, index))
            } 
            break
          }
        }
      }
    }

    return moves
  }

  getColumn(board, id) {
    let moves = []

    const pos = Board.getPosition(id)
    if(pos == null) return moves
    const { row, col } = pos
    const column = board.getColumn(col)

    for(let delta = -1; delta < 2; delta += 2) {
      for(let i = 1; i < column.length; i++) {
        const index = row + (delta * i)
        if(index >= 0 && index < column.length) {
          if(column[index] === false) {
            moves.push(Board.getId(index, col))
          } else {
            if(column[index].color !== this.color) {
              moves.push(Board.getId(index, col))
            } 
            break
          }
        }
      }
    }

    return moves

  }

  getDiagonals(board, id) {
    let moves = []

    const pos = Board.getPosition(id)
    if(pos == null) return moves
    const { row, col } = pos

    for(let dr = -1; dr < 2; dr += 2) {
      for(let dc = -1; dc < 2; dc += 2) {
        for(let i = 1; i < board.size; i++) {
          const nr = row + (dr * i)
          const nc = col + (dc * i)
          if(nr < 0 || nc < 0 || nr > 7 || nc > 7) break
          const id = Board.getId(nr, nc)
          const tile = board.getTileContents(id)
          if(tile === false) {
            moves.push(id)
          } else {
            if(tile.color !== this.color) {
              moves.push(id)
            }
            break
          }
        }
      }
    }

    return moves

  }

  isValidTile(board, value) {
    if(value == null) return false              
    const pos = board.getTileContents(value)
    if(pos == null) return false
    if(pos === false) return true               // valid if tile is empty
    if(pos.color === this.color) return false   // invalid if tile is occupied by same color
    return true
  }

  filterMoves(board, moves) {
    return moves.filter(v => this.isValidTile(board, v))
  }

  toString() {
    return `${toNormalCase(this.color)}${toNormalCase(this.notation)}`
  }

}


export class Pawn extends Piece {
  
  constructor(color) {
    super('Pawn', '', color)
  }

  getAvaliableMoves(board, id) {
    let moves = []

    const pos = Board.getPosition(id)
    const dy = this.color === 'white' ? -1 : 1
    const { row, col } = pos
    
    moves.push(Board.getId(row + dy, col))
    moves.push(Board.getId(row + dy, col - 1))
    moves.push(Board.getId(row + dy, col + 1))
    moves.push(Board.getId(row + dy * 2, col))

    const pos1 = board.getTileContents(moves[0])
    const pos2 = board.getTileContents(moves[1])
    const pos3 = board.getTileContents(moves[2])
    const pos4 = board.getTileContents(moves[3]) 

    if(pos1 !== false) (moves[0] = false)                             // only allow tile infront if empty
    if(pos2 === false) (moves[1] = false)                             // don't allow diagonal is empty
    if(pos2) if(pos2.color === this.color) (moves[1] = false)         // allow diagonal if opposite color
    if(pos3 === false) (moves[2] = false)                             // don't allow diagonal is empty'
    if(pos3) if(pos3.color === this.color) (moves[2] = false)         // allow diagonal if opposite color
    if(!moves[0] || this.moved || pos4 !== false) (moves[3] = false)  // allow two moves ahead, if start

    return moves.filter((value) => { return value })
  }

}


export class Rook extends Piece {

  constructor(color) {
    super('Rook', 'R', color)
  }

  getAvaliableMoves(board, id) {
    let moves = [] 
    
    moves.push(this.getRow(board, id))
    moves.push(this.getColumn(board, id))

    return moves.flat()
  }

}


export class Knight extends Piece {

  constructor(color) {
    super('Knight', 'N', color)
  }

  getAvaliableMoves(board, id) {
    let moves = [] 

    const pos = Board.getPosition(id)
    const { row, col } = pos

    moves.push(Board.getId(row + 2, col + 1))
    moves.push(Board.getId(row - 2, col + 1))
    moves.push(Board.getId(row + 2, col - 1))
    moves.push(Board.getId(row - 2, col - 1))
    moves.push(Board.getId(row + 1, col + 2))
    moves.push(Board.getId(row + 1, col - 2))
    moves.push(Board.getId(row - 1, col + 2))
    moves.push(Board.getId(row - 1, col - 2))

    return this.filterMoves(board, moves)

  }

}


export class Bishop extends Piece {

  constructor(color) {
    super('Bishop', 'B', color)
  }

  getAvaliableMoves(board, id) {
    return this.getDiagonals(board, id)
  }

}


export class Queen extends Piece {

  constructor(color) {
    super('Queen', 'Q', color)
  }

  getAvaliableMoves(board, id) {
    let moves = []
    
    moves.push(this.getRow(board, id))
    moves.push(this.getColumn(board, id))
    moves.push(this.getDiagonals(board, id))

    return moves.flat()
  }

}


export class King extends Piece {

  constructor(color) {
    super('King', 'K', color)
  }

  getAvaliableMoves(board, id) {
    let moves = []
  
    const pos = Board.getPosition(id)
    const { row, col } = pos
    
    for(let dr = -1; dr < 2; dr++) {
      for(let dc = -1; dc < 2; dc++) {
        moves.push(Board.getId(row + dr, col + dc))
      }
    }

    return this.filterMoves(board, moves)

  }

}