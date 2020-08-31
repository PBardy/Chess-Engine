import * as Pieces from './pieces.js'
import Board from './board.js'
import { copyArray } from './util.js'

export class Move {

  constructor(valid, check, checkmate) {
    this.valid = valid
    this.check = check
    this.checkmate = checkmate
  }

}


export default class ChessEngine {

  history = []
  takenWhitePieces = []
  takenBlackPieces = []
  board = new Board(8)
  turn = 'white'

  constructor() {

    this.board.create()

    this.board.addPiece(new Pieces.Rook('black'),  'A8')
    this.board.addPiece(new Pieces.Knight('black'),'B8')
    this.board.addPiece(new Pieces.Bishop('black'),'C8')
    this.board.addPiece(new Pieces.Queen('black'), 'D8')
    this.board.addPiece(new Pieces.King('black'),  'E8')
    this.board.addPiece(new Pieces.Bishop('black'),'F8')
    this.board.addPiece(new Pieces.Knight('black'),'G8')
    this.board.addPiece(new Pieces.Rook('black'),  'H8')

    this.board.addPiece(new Pieces.Pawn('black'),  'A7')
    this.board.addPiece(new Pieces.Pawn('black'),  'B7')
    this.board.addPiece(new Pieces.Pawn('black'),  'C7')
    this.board.addPiece(new Pieces.Pawn('black'),  'D7')
    this.board.addPiece(new Pieces.Pawn('black'),  'E7')
    this.board.addPiece(new Pieces.Pawn('black'),  'F7')
    this.board.addPiece(new Pieces.Pawn('black'),  'G7')
    this.board.addPiece(new Pieces.Pawn('black'),  'H7')

    this.board.addPiece(new Pieces.Pawn('white'),  'A2')
    this.board.addPiece(new Pieces.Pawn('white'),  'B2')
    this.board.addPiece(new Pieces.Pawn('white'),  'C2')
    this.board.addPiece(new Pieces.Pawn('white'),  'D2')
    this.board.addPiece(new Pieces.Pawn('white'),  'E2')
    this.board.addPiece(new Pieces.Pawn('white'),  'F2')
    this.board.addPiece(new Pieces.Pawn('white'),  'G2')
    this.board.addPiece(new Pieces.Pawn('white'),  'H2')

    this.board.addPiece(new Pieces.Rook('white'),  'A1')
    this.board.addPiece(new Pieces.Knight('white'),'B1')
    this.board.addPiece(new Pieces.Bishop('white'),'C1')
    this.board.addPiece(new Pieces.Queen('white'), 'D1')
    this.board.addPiece(new Pieces.King('white'),  'E1')
    this.board.addPiece(new Pieces.Bishop('white'),'F1')
    this.board.addPiece(new Pieces.Knight('white'),'G1')
    this.board.addPiece(new Pieces.Rook('white'),  'H1')

  }

  getOpponentColor() {
    return this.turn === 'white' ? 'black' : 'white'
  }

  isKingChecked(id1, id2, from, color) {

    let checked = false

    const boardCopy = copyArray(this.board.board)
    const nextBoardState = new Board(8, boardCopy)
    nextBoardState.removePiece(id1)
    nextBoardState.removePiece(id2)
    nextBoardState.addPiece(from, id2)
    const kingPosition = nextBoardState.getKingPosition(color)

    for(let row = 0; row < this.board.size; row++) {
      for(let col = 0; col < this.board.size; col++) {
        const id = Board.getId(row, col)
        const tile = nextBoardState.getTileContents(id)
        if(tile === false) continue
        if(tile.color === color) continue
        const moves = tile.getAvaliableMoves(nextBoardState, id)
        if(moves.indexOf(kingPosition) > -1) (checked = true)
      }
    }

    return checked

  }

  isValidMove(id1, id2) {
    if(!this.board.isWithinBounds(id1)) return false
    if(!this.board.isWithinBounds(id2)) return false
    const from = this.board.getTileContents(id1)
    const to = this.board.getTileContents(id2)
    if(from === false) return false
    if(from.color !== this.turn) return false
    if(to.color === this.turn) return false
    const moves = from.getAvaliableMoves(this.board, id1)
    const isvalid = moves.indexOf(id2) > -1
    if(!isvalid) console.log('Invalid move')
    const checksOwnKing = this.isKingChecked(id1, id2, from, this.turn) // does your move result in your own king being checked
    if(checksOwnKing) return false

    const opponentColor = this.getOpponentColor()
    const checksOpponentsKing = this.isKingChecked(id1, id2, from, opponentColor)  // does move result in enemy king being checked

    return new Move(isvalid, checksOpponentsKing, false)
  }

  makeMove(from, to) {
    const move = this.isValidMove(from, to)
    if(!move.valid) return move
    const piece = this.board.getTileContents(from)
    this.board.removePiece(from)
    this.board.removePiece(to)
    this.board.addPiece(piece, to)
    this.history.push([from, to])
    this.turn = this.getOpponentColor()
    return move
  }

}