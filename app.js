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
  let score = 0;

  //layout of grid | what's in the squares
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,4,4,1,0,0,0,0,1,4,4,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,1,4,1,0,0,0,3,1,4,1,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,
    1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,3,1,1,1,0,1,1,1,0,1,1,1,0,0,1,1,2,2,1,1,1,0,1,
    1,0,1,0,0,0,0,1,0,0,1,4,1,0,1,4,4,1,0,1,2,2,2,2,2,1,0,1,
    1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,1,0,0,1,2,2,2,2,2,1,0,1,
    1,0,0,0,1,0,0,1,0,0,1,4,1,0,1,0,0,1,0,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,0,0,1,0,0,1,4,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,1,0,1,0,0,1,0,0,1,
    1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,4,1,0,1,1,0,1,0,0,1,
    1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,4,1,1,0,0,1,
    4,0,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,4,4,1,0,0,1,
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
      } else if (layout[i] == 2) {
        squares[i].classList.add('alien-lair')
      } else if (layout[i] === 3) {
        squares[i].classList.add('jetpack');
      }
    }
  }
  createBoard()

  //starting position of star-man
  let starmanCurrentIndex = 489;

  squares[starmanCurrentIndex].classList.add('star-man');

  //move star-man
  function moveStarman(e) {

    squares[starmanCurrentIndex].classList.remove('star-man')

    switch(e.keyCode) {
      case 37:
        if(starmanCurrentIndex % width !== 0 && 
        !squares[starmanCurrentIndex -1].classList.contains('wall') &&
        !squares[starmanCurrentIndex -1].classList.contains('alien-lair'))
        starmanCurrentIndex -=1
         
        //check if starman is in the left exit
         if((starmanCurrentIndex -1) === 447) {
          starmanCurrentIndex = 26
        }
        break
      case 38:
        if(starmanCurrentIndex - width >= 0 && 
          !squares[starmanCurrentIndex -width].classList.contains('wall') &&
          !squares[starmanCurrentIndex -width].classList.contains('alien-lair')) 
          starmanCurrentIndex -=width

          //check if starman is in the top exit
          if((starmanCurrentIndex -width) === -2) {
            starmanCurrentIndex = 448
          }
        break
      case 39:
        if(starmanCurrentIndex % width < width -1 && 
          !squares[starmanCurrentIndex +1].classList.contains('wall') &&
          !squares[starmanCurrentIndex +1].classList.contains('alien-lair')) 
          starmanCurrentIndex +=1
        break
      case 40:
        if(starmanCurrentIndex + width < width * width && 
          !squares[starmanCurrentIndex +width].classList.contains('wall') &&
          !squares[starmanCurrentIndex +width].classList.contains('alien-lair')) 
          starmanCurrentIndex +=width
        break
    }

    squares[starmanCurrentIndex].classList.add('star-man');

    starBitCollected();
    jetpackCollected();
    checkForGameOver()
    checkForWin()

  }
  document.addEventListener('keyup', moveStarman)
  
  //count starting star-bits in map
  var totalBits = 0;
  for(var i = 0; i < layout.length; i++) {
    if(layout[i] == 0) {
      ++totalBits
    }
  }
  console.log('totalBits: ' + totalBits)
  var remainingBits = totalBits

  //starman collects star-bit
  function starBitCollected(){
    if(squares[starmanCurrentIndex].classList.contains('star-bit')) {
      ++score
      scoreDisplay.innerHTML = score
      squares[starmanCurrentIndex].classList.remove('star-bit')
      --remainingBits
      console.log('remainingBits: ' + remainingBits)
    }
  }

  //when starman collects jetpack
  function jetpackCollected() {
    if(squares[starmanCurrentIndex].classList.contains('jetpack')) {
      score +=10
      aliens.forEach(alien => alien.isScared = true)
      setTimeout(unScareAlien, 10000)
      squares[starmanCurrentIndex].classList.remove('jetpack')
    }
  }

  //make aliens stop appearing as aquamarine
  function unScareAlien(){
    aliens.forEach(alien => alien.isScared = false)
  }

  //create alien template
  class Alien {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.timerId = NaN
      this.isScared = false
    }
  }
  var aliens = [
    new Alien('lumpo', 275, 250),
    new Alien('sinko', 273, 300),
    new Alien('sticko', 303, 400),
    new Alien('mike', 301, 500)
  ]

  //draw aliens on grid
  aliens.forEach(alien => {
    squares[alien.currentIndex].classList.add(alien.className)
    squares[alien.currentIndex].classList.add('alien')
  })

  //move aliens randomly
  aliens.forEach(alien => moveAlien(alien))

  //write the function to move aliens
  function moveAlien(alien) {
    const directions =[-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    alien.timerId = setInterval(function() {
      //if alien is not heading into wall or another alien, they can go there
      if (!squares[alien.currentIndex + direction].classList.contains('wall') &&
      !squares[alien.currentIndex + direction].classList.contains('alien')) {
        //you can go here
        //remove all alien related classes
        squares[alien.currentIndex].classList.remove(alien.className, 'alien', 'scared-alien')
        //change the current index to the new safe square
        alien.currentIndex += direction
        //redraw the alien in the new safe space
        squares[alien.currentIndex].classList.add(alien.className, 'alien')
        //else find new direction to try
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      //if alien is scared
      if (alien.isScared) {
        squares[alien.currentIndex].classList.add('scared-alien')
      }

      //if alien scared and starman runs into it
      if(alien.isScared && squares[alien.currentIndex].classList.contains('star-man')) {
        squares[alien.currentIndex].classList.remove(alien.className, 'alien', 'scared-alien')
        alien.currentIndex = alien.startIndex
        score +=100
        squares[alien.currentIndex].classList.add(alien.className, 'alien')
      }
      checkForGameOver()
    }, alien.speed)
  }

  //check for game over
  function checkForGameOver() {
    if (squares[starmanCurrentIndex].classList.contains('alien') &&
    !squares[starmanCurrentIndex].classList.contains('scared-alien')) {
      aliens.forEach(alien => clearInterval(alien.timerId))
      document.removeEventListener('keyup', moveStarman)
      setTimeout(function(){alert('Game Over!')
      }, 250)
    }
  }

    //check for win
    function checkForWin() {
      if (remainingBits == 0) {
        aliens.forEach(alien => clearInterval(alien.timerId))
        document.removeEventListener('keyup', moveStarman)
        setTimeout(function(){alert('YOU WON!\n' + 'Final score: ' + score)
        }, 250)
      }
    }

})