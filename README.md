# Chess Engine

## Description

### How to play

Pieces are moved by select the tile a piece is placed on; doing so will highlight the tile so you know it is selected, and also highlight all the possible moves such a piece can make. Clicking on these highlight tiles causes the piece to move. Moves can also be made by entering the tile coordinate into the form element below the board display. A history of moves is displayed on the right of the board.

## Roadmap

Features to implement:

* Game win screen
* Game loss screen
* Game stalemate screen
* Special moves such as castling and en passant capturing
* Win/loss condition checking

Fixes needed:

* Remove moves that result in a player's king being checked/checkmated from the possible moves highlighted by selecting a piece

Future features:

* A minimax implementation of a chess AI using piece scoring tables as a heuristic
* Better mobile support 