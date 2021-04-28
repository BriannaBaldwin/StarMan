"use strict";
/* 
Original Author: Brianna Baldwin
 Date Created: 04/27/2021
 Date Last Modified: 04/27/2021
 Modified by: Brianna Baldwin
 Modification log:
    04/27/2021 - Created file
    */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const width = 28; //28 x 28 = 784 squares

  //layout of grid | what's in the squares
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,4,4,1,0,1,1,0,1,4,4,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,1,4,1,0,0,0,3,1,4,1,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,
    1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,3,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,2,2,0,0,0,0,1,
    1,0,1,0,0,0,0,1,0,0,1,4,1,0,1,4,4,1,0,2,2,2,2,2,2,0,0,1,
    1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,1,0,0,2,2,2,2,2,2,0,0,1,
    1,0,0,0,1,0,0,1,0,0,1,4,1,0,1,0,0,1,0,2,2,2,2,2,2,0,0,1,
    1,0,1,1,1,0,0,1,0,0,1,4,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,1,0,1,0,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,1,4,1,0,1,1,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0,1,4,1,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,4,4,1,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,4,4,1,0,0,1,
    1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,3,0,0,0,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
    1,0,3,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,3,0,1,
    1,0,1,4,4,4,4,1,0,0,1,1,1,1,1,1,1,1,0,0,1,4,4,4,4,1,0,1,
    1,0,1,4,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ];

  const squares = [];

  //legend
  // 0 = star-bit
  // 1 = wall
  // 2 = alien-lair
  // 3 = jetpack
  // 4 = empty


  //draw grid and render it
  function createBoard() {
    for (let i=0; i < layout.length; i++) {
      const square = document.createElement('div');
      grid.appendChild(square);
      squares.push(square);

      //add layout to the board
      if(layout[i] === 0) {
        squares[i].classList.add('star-bit');
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall');
      } else if (layout[i] === 3) {
        squares[i].classList.add('jetpack');
      }
    }
  }
  createBoard()

  //starting position of star-man
  let starmanCurrentIndex = 425;

  squares[starmanCurrentIndex].classList.add('star-man');

  //move star-man
  function moveStarman(e) {

    squares[starmanCurrentIndex].classList.remove('star-man')

    switch(e.keyCode) {
      case 37:
        if(starmanCurrentIndex % width !== 0) starmanCurrentIndex -=1
        break
      case 38:
        if(starmanCurrentIndex - width >= 0) starmanCurrentIndex -=width
        break
      case 39:
        if(starmanCurrentIndex % width < width -1) starmanCurrentIndex +=1
        break
      case 40:
        if(starmanCurrentIndex + width < width * width) starmanCurrentIndex +=width
        break
    }

    squares[starmanCurrentIndex].classList.add('star-man');

    //starBitCollected()
    //jetpackCollected()
    //checkForGameOver()
    //checkForWin()

  }
  document.addEventListener('keyup', moveStarman)
})