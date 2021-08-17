let firstNumber
let secondNumber
let newNumber

let winCounter = 0
let loseCounter = 0

let GameManager = {
    setGameStart: function () {
        let getFirstNumber = document.querySelector( ".firstNumber" )
        let getSecondNumber = document.querySelector( ".secondNumber" )

        let getLowerNumber = document.querySelector(".lowerNumber")
        let getMiddleNumber = document.querySelector(".middleNumber")
        let getHighNumber = document.querySelector(".higherNumber")

        // Make unnecessary letters invisible
        getLowerNumber.style.visibility = "hidden"
        getMiddleNumber.style.visibility = "hidden"
        getHighNumber.style.visibility = "hidden"

        let randomGeneratedNumbers = GameManager.setRandomStartNumbers()

        firstNumber = randomGeneratedNumbers [0]
        getFirstNumber.textContent = firstNumber.toString()
        secondNumber = randomGeneratedNumbers [1]
        getSecondNumber.textContent = secondNumber.toString()

        let getButton = document.querySelector(".newGameBTN")

        getButton.innerHTML = '<button type="button" class="btn-inside" onclick="GameManager.setInside()">Inside</button>' +
            '<button type="button" class="btn-outside" onclick="GameManager.setOutside()">Outside</button>'

        //Reset background-color each round
        document.body.style.backgroundColor = 'white'

        console.log(winCounter)
    },
    getRandomNumber: function() {
        return Math.floor( Math.random() * 10 )
    },
    setRandomStartNumbers: function () {
        let randomNumbers = []

        let firstRandomNumber = GameManager.getRandomNumber()
        let secondRandomNumber = GameManager.getRandomNumber()

        //First number may never be the same as second number
        while (firstRandomNumber === secondRandomNumber){
            secondRandomNumber = GameManager.getRandomNumber()
        }

        //Push numbers from low to high to array
        if (firstRandomNumber > secondRandomNumber){
            randomNumbers.push(secondRandomNumber)
            randomNumbers.push(firstRandomNumber)
        } else {
            randomNumbers.push(firstRandomNumber)
            randomNumbers.push(secondRandomNumber)
        }

        return randomNumbers

    },
    getThirdNumber: function () {

        newNumber = GameManager.getRandomNumber()

        //Third number may never be the same as first two numbers
        while(firstNumber === newNumber || secondNumber === newNumber) {
            newNumber = GameManager.getRandomNumber()
        }

        return newNumber
    },
    setInside: function () {
        let getLowerNumber = document.querySelector(".lowerNumber")
        let getMiddleNumber = document.querySelector(".middleNumber")
        let getHighNumber = document.querySelector(".higherNumber")

        let thirdNumber = GameManager.getThirdNumber()

        let isInside;

        //Checken if third number is between first and second
        isInside = thirdNumber > firstNumber && thirdNumber < secondNumber;

        //Change background color, depending on right or wrong, add win- or lose counter + set third number in right place.
        if (isInside){
            winCounter++
            getMiddleNumber.style.visibility = "visible"
            getMiddleNumber.textContent = thirdNumber.toString()
            document.body.style.backgroundColor = "green"
        } else {
            loseCounter++
            document.body.style.backgroundColor = "red"
            if (thirdNumber < firstNumber){
                getLowerNumber.style.visibility = "visible"
                getLowerNumber.textContent = thirdNumber.toString()
            } else {
                getHighNumber.style.visibility = "visible"
                getHighNumber.textContent = thirdNumber.toString()
            }
        }

        GameManager.setGameScore()
        GameManager.gameWon()
        GameManager.gameLost()
        GameManager.setNewGame()
    },
    setOutside: function () {
        let getLowerNumber = document.querySelector(".lowerNumber")
        let getMiddleNumber = document.querySelector(".middleNumber")
        let getHighNumber = document.querySelector(".higherNumber")

        let thirdNumber = GameManager.getThirdNumber()

        let isOutside;

        //Check if third numbers is outside first two numbers
        isOutside = thirdNumber < firstNumber || thirdNumber > secondNumber;

        //Change background color, depending on right or wrong, add win- or lose counter + set third number in right place.
        if (isOutside){
            winCounter++
            document.body.style.backgroundColor = "green"
            if (thirdNumber < firstNumber){
                getLowerNumber.style.visibility = "visible"
                getLowerNumber.textContent = thirdNumber.toString()
            } else {
                getHighNumber.style.visibility = "visible"
                getHighNumber.textContent = thirdNumber.toString()
            }
        } else {
            loseCounter++
            getMiddleNumber.style.visibility = "visible"
            getMiddleNumber.textContent = thirdNumber.toString()
            document.body.style.backgroundColor = "red"
        }

        GameManager.setGameScore()
        GameManager.gameWon()
        GameManager.gameLost()
        GameManager.setNewGame()

    },
    setNewGame: function () {

        let getButton = document.querySelector(".newGameBTN")

        getButton.innerHTML = '<div class="newGameBTN"><button type="button" onClick="GameManager.setGameStart()">New Game</button></div>'

    },
    setGameScore: function () {
        let getWinCounter = document.querySelector(".wins")
        let getLoseCounter = document.querySelector(".loses")

        if(winCounter > 0) {
            getWinCounter.innerHTML = '<h3>Games Won: '+ winCounter +'</h3>'
        }

        if(loseCounter > 0) {
            getLoseCounter.innerHTML = '<h3>Games Lost: '+ loseCounter +'</h3>'
        }
    },
    gameWon: function () {
        let getField = document.querySelector(".gameField")

        if (winCounter === 10){
            getField.innerHTML = '<div  class="game-end">' +
                '<h1>You have won the Match!!</h1>' +
                '<button type="button" class="resetGame-btn" onclick=GameManager.resetGame()>New Game</button>' +
                '</div>'
        }
    },
    gameLost: function () {
        let getField = document.querySelector(".gameField")

        if (loseCounter === 10){
            getField.innerHTML = '<div  class="game-end">' +
                '<h1>You have lost the Match!</h1>' +
                '<button type="button" class="resetGame-btn" onclick=GameManager.resetGame()>New Game</button>' +
                '</div>'
        }
    },
    resetGame: function() {
        winCounter = 0
        loseCounter = 0

        let getField = document.querySelector(".game-end")

        getField.innerHTML = '<div class="gameField">' +
            '<div class="gameBoard">' +
                '<span class="lowerNumber">L</span><span class="firstNumber">A</span>' +
        '<span class="middleNumber">M</span><span class="secondNumber">B</span>' +
        '<span class="higherNumber">H</span>' +
            '</div>' +
            '<div class="newGameBTN">' +
                '<button type="button" onclick="GameManager.setGameStart()">New Game</button>' +
            '</div>' +
            '<div class="wins"></div>' +
            '<div class="loses"></div>' +
       '</div>'

        document.body.style.backgroundColor = 'white'

    }
}