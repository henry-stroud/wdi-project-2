# WDI-Project 2
# General Assembly Project 2 :  Front-end application

## Goal: To create a Front-end application using React.js and an External API
### Timeframe
2 days

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS
* React.js
* External APIs
* GitHub

## My Project - Artistify

![Artistify](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/Main%20Page%20Screenshot.png)

You can find a hosted version here ----> [henry-stroud.github.io/wdi-project-1](https://henry-stroud.github.io/wdi-project-1/)

### Game overview
Battleships is a one person tactical guessing game. The aim is to sink all five enemy ships before the computer sinks yours. The player controls the placement of his/her ships and also where to fire on the opponents grid.

### Controls
- Use the mouse to click play
- Mouse click on each ship and then click horizontal or vertical, then click on user grid to place ship
- End game: Click win or lose button once game is over to reset game

### Game Instructions
1. The game begins with a play button to click in order to start the game.

![screenshot - Play Button](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/Play%20Button%20Screenshot.png)

2. Once the game begins, there is short animation of the grids appearing for both user on the left and computer on the right.

![screenshot - Beginning grids](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/Main%20Page%20Screenshot.png)

3. User must click on the small ship icons on left side, below user grid. User then can choose whether they want to place their ship horizontal or vertical via clicking the corresponding buttons. Once clicked the user can click on a square on their grid to place the corresponding battleship.

![screenshot - Placement of Ship](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/Battleship%20Placement.png)

4. Ships cannot be placed adjacent and touching, they can also only be placed horizontally or vertically and not diagonally. Ships can also not be placed so that they go off the side of the board or be placed twice. A message will display if a ship cannot be placed, or has already been placed.

![screenshot - Ship Cannot be Placed Here](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/Ship%20cant%20be%20placed%20here.png)

5. Once all user ships are placed a message will display so user knows to click on enemy grid on the right to fire a torpedo at that square.

![screenshot - All Ships Placed, Game Start](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/All%20Ships%20Placed.png)

6. Once a user clicks on an enemy grid, it will either show a white square or a red square. A white square is a miss, a red square is a hit. If user hits then user will have another turn until user misses. If user misses then computer has a turn, and the same rules apply for the computer.

![screenshot - Torpedo Hit or Miss](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/HitorMiss.png)

6. Once a ship is sunk it will turn black, and when user ship is sunk the icon for the ship will also black out.

![screenshot - Ship Sunk](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/shiphit.png)

6. If computer sinks all user ships then it wins, and vice versa if user sinks all computer ships.

![screenshot - All Ships Sunk, Game End](https://raw.githubusercontent.com/henry-stroud/wdi-project-1/master/endgameshot.png)



## Process

First of all, I needed to create the parallel basic grid layouts for both computer and user side. I used JQuery to create 100 divs in HTML inside a div container, then used CSS flexbox to make them into a square. These grids were where I was going to generate the placement of the ships. Each cell within the grid has an index number corresponding to the index number of an array of 100 in length. The ships were created by adding individual ship objects to the two arrays, mapping the arrays to the grids and using classes to show the ships once placed.

I created the Ships via a javascript class, creating a new Ship each time with varying properties for length, hitPoints, sunk value etc. Once a user places their ship, a function adds all the grid index numbers to an array of occupied squares, so that the user can't add a ship twice on the same square. It also adds all adjacent squares to this occupied array so the user can't put a ship adjacent to another one. This logic applies until all ships are placed.

The same logic applies for the computer placement of the ships, replacing a user click with a random Number generator between 0 and 99, constantly checking if any of those index numbers in the array are already occupied. I also had to code in some conditional statements that prevented users and computers from placing ships off the board, and also preventing it adding occupied spaces to the array that were not constrained by the grid boundaries.

Once I had both user and computer ship placement done, I added the game mechanics. I included a click event on each grid square on the computer side, which when clicked would check that index against the computer grid array, if it had a ship object at that index number it would log a hit, make the square red and give the user another go. Once a ship is hit, the ship object that has been hit reduces hitPoints by 1. When the computer misses it goes back to the user turn in the playGame function, but when it returns to the computer's turn it checks whether the last hit Ship has hitpoints of greater than 0. If it does, then it fires adjacent to that square until it finds a hit, and then fires adjacent to that last hit in the correct direction.

I did this directional shooting by adding the hit numbers and miss numbers into an array. The computer generates a number between 0-99 and checks whether that index number matches the array full of its already tried numbers. If it doesn't match then it fires. Once it has two hits next to each other, it then moves either horizontally or vertically depending on if the absolute value of the lastHit - the second Last Hit is 10 or 1. If all potential guesses around the hit are already in the already tried numbers array, then the computer will move back to check around the first original hit of that ship and move the other direction, until it has sunk.

By structuring the game with objects, it made it easier for me to reduce hitPoints of specific ships all at the same time, as well as knowing when which individual ship had sunk. When a ship has a hitPoints of 0 it adds the class 'sunk' which turns all its cells black. And also adds this class to the ship icon below the user grid.

### Challenges

The main challenge at the start was to generate the computer board randomly, with each ship not overlapping and not placing itself adjacent to another ship. This was done with a lot of conditional statements, using the modulus operator to determine whether a grid number ended in 9 or 0, to place a rule that the occupied spaces around each ship would not go off the board. I also had to create a math equation that would work for every ship placement, so as to refactor my main function and not repeat it.

The second big challenge was to make the computer's firing function clever and not just random. Once the computer hit a ship I had to let the computer know it had hit a ship, but not which one. I had to create the hitPoints key on the ship object. The next big challenge was getting the computer to fire horizontally if two hits were next to each other horizontally or vertically if the hits were next to each other vertically. Then once it hit the end of this run, and it had not sunk the ship, it needed to go back to the original hit and search around that instead until ship was sunk. This took a considerable amount of logic and recursion.

### Wins

Creating the computer firing logic helped the game become challenging and actually playable. The computer is clever enough to know that once it has sunk a ship it shouldn't shoot on any adjacent squares to that ship, and also to shoot both horizontally or vertically in the correct direction each time. This makes for a challenging game for the user.

The below code is just a snippet of the computer firing code, when it goes into huntedMode, firing around the ship.

```
function huntedMode(hitRange) {
  if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 10) {
    randomNumber = Math.floor(Math.random() * 2)
    if (hitRange.every(elem => computerTargetNumbers.indexOf(elem) >= 0)) {
      return huntedMode([originalShot + 10, originalShot - 10])
    }
  } else if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 1) {
    randomNumber = Math.floor(Math.random() * 2)
    if (hitRange.every(elem => computerTargetNumbers.indexOf(elem) >= 0)) {
      return huntedMode([originalShot - 1, originalShot + 1])
    }
  } else {
    randomNumber = Math.floor(Math.random() * 4)
    console.log(hitRange)
    console.log(computerTargetNumbers)
  }
  // hit range needs to be individual to horizontal or vertical when it is parsed so have the random functions in the computer placement function
  const shotChoice = hitRange[randomNumber]
  for (let i = 0; i < computerTargetNumbers.length; i++) {
    if (shotChoice === computerTargetNumbers[i]) {
      console.log('already tried this square')
      return huntedMode(hitRange)
    }
  }
  for (let i = 0; i < humanShipArray.length; i++) {
    if (humanGridArray[shotChoice] === humanShipArray[i]) {
      const targetedShip = humanShipArray[i]
      targetedShip.hitPoints = targetedShip.hitPoints - 1
      console.log('computer hit!')
      computerHitNumbers.push(shotChoice)
      console.log(computerHitNumbers)
      computerTargetNumbers.push(shotChoice)
      $humanGridItems.eq(shotChoice).addClass('hit')
      if (targetedShip.hitPoints === 0) {
        targetedShip.sunk = true
        for (let x = 0; x < targetedShip.position.length; x++) {
          $humanGridItems.eq(targetedShip.position[x]).addClass('sunk')
        }
        computerTargetNumbers = computerTargetNumbers.concat(targetedShip.occupied)
        console.log(`Your ${targetedShip.name} has been sunk!`)
        targetedShip.relatedShip.css({
          background: 'black'
        })
      }
      return setTimeout(computerShot, 1000)
    }
  }
  console.log('computer miss!')
  $humanGridItems.eq(shotChoice).addClass('miss')
  computerTargetNumbers.push(shotChoice)
  computerMissNumbers.push(shotChoice)
  return
}
```

## Future features

If I had more time, I would have liked to make the game playable on mobile, and also made the game expandable with a custom generated grid. So I would have liked to be able to generate a grid of specific size based on user input, and also number of ships. I would have also liked to implement another large grid underneath the main grid, so that I could do a css / javascript animation moving a 'torpedo' across from the user to computer grid and vice versa. This torpedo 'div' would be on a 1s timer that would correspond with the 1s it takes for the computer or user grid to log a hit. Creating the illusion that it had hit the grid at the same time.
