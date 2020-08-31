export default class Board {

  static rowLabels = [8, 7, 6, 5, 4, 3, 2, 1]
  static colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  static getId(row, col) {
    if(row == null) return
    if(col == null) return
    if(row < 0 || row > Board.rowLabels.length - 1) return
    if(col < 0 || col > Board.colLabels.length - 1) return
    return `${Board.colLabels[col]}${Board.rowLabels[row]}`
  }

  static getPosition(id) {
    if(id == null) return
    if(id.length !== 2) return
    const row = Board.rowLabels.indexOf(parseInt(id.charAt(1)))
    const col = Board.colLabels.indexOf(id.charAt(0))
    if(row == null) return
    if(col === null) return
    return { row: row, col: col } 
  }

  constructor(size, board = []) {
    this.size = size
    this.board = board
  }

  create() {
    for(let row = 0; row < this.size; row++) {
      this.board[row] = []
      for(let col = 0; col < this.size; col++) {
        this.board[row][col] = false
      }
    }
  }

  getRow(row) {
    if(row == null) return
    if(row < 0 || row > 7) return 
    return this.board[row]
  }

  getColumn(col) {
    if(col == null) return
    if(col < 0 || col > 7) return
    return this.board.map((row) => { return row[col] })
  }

  getKingPosition(color) {
    for(let row = 0; row < this.size; row++) {
      for(let col = 0; col < this.size; col++) {
        if(this.board[row][col]) {
          if(this.board[row][col].color === color) {
            if(this.board[row][col].name === "King") {
              return Board.getId(row, col)
            }
          }
        }
      }
    }
  }

  addPiece(piece, id) {
    const pos = Board.getPosition(id)
    if(pos == null) return
    const { row, col } = pos
    this.board[row][col] = piece
  }

  removePiece(id) {
    const pos = Board.getPosition(id)
    if(pos == null) return
    const { row, col } = pos
    this.board[row][col] = false
  }

  isWithinBounds(id) {
    const pos = Board.getPosition(id)
    if(pos == null) return
    const { row, col } = pos
    if(row == null) return false
    if(col == null) return false
    if(row < 0 || row > 7) return false
    if(col < 0 || col > 7) return false
    return true
  }

  getTileContents(id) {
    const pos = Board.getPosition(id)
    if(pos == null) return
    const { row, col } = pos
    if(row == null) return
    if(col == null) return
    if(row < 0 || row > 7) return
    if(col < 0 || col > 7) return
    if(this.board[row] == null) return
    return this.board[row][col]
  }

}