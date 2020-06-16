// MIT License

// Copyright (c) 2020 Mark Sameh Abdalla Shenouda

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	const playBtn = document.querySelector('#play-btn')
	const mainScene = document.querySelector('#main-scene')
	const gameScene = document.querySelector('#game-scene')
	const optionsScene = document.querySelector('#options-scene')
	const soundControl = document.querySelectorAll('.sound')
	const scoreDisplay = document.querySelector('.score span')
	const pauseBtn = document.querySelector('#pause-btn')
	const resumeBtn = document.querySelector('#resume-btn')
	const resetBtn = document.querySelector('#reset-btn')
	const homeBtn = document.querySelector('#home-btn')
	const width = 8
	let squares = []
	let selectedSquares = []
	let soundOn = true
	let score = 0

	const candyColors = [
		'url(assets/red-candy.png)',
		'url(assets/yellow-candy.png)',
		'url(assets/orange-candy.png)',
		'url(assets/purple-candy.png)',
		'url(assets/green-candy.png)',
		'url(assets/blue-candy.png)'
	  ]

	function sound(src) {
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);
		
		this.play = function(){
			if(soundOn){
				this.sound.play();
			}
		}
		this.stop = function(){
		  this.sound.pause();
		}
	  }


	  const trueSound = new sound('assets/true.wav')
	  const falseSound = new sound('assets/false.wav')
	  const clickSound = new sound('assets/click.wav')

	  function createBoard() {
		for (let i = 0; i < width*width; i++) {
		  const square = document.createElement('div')
		  square.setAttribute('draggable', true)
		  square.setAttribute('id', i)
		  let randomColor = Math.floor(Math.random() * candyColors.length)
		  square.style.backgroundImage = candyColors[randomColor]
		  grid.appendChild(square)
		  squares.push(square)
		}
	  }

	createBoard()


	function moveIntoSquareBelow() {
		for (i = 63; i > 8; i --) {
			if(squares[i].style.backgroundImage === '' && squares[i - width].style.backgroundImage !== '') {
				squares[i].style.backgroundImage = squares[i - width].style.backgroundImage
				squares[i - width].style.backgroundImage = ''
			}
		}

		for(i=0; i < 63; i++) {
			if(squares[i].style.backgroundImage === ''){
				let randomColor = Math.floor(Math.random() * candyColors.length)
				squares[i].style.backgroundImage = candyColors[randomColor]
			}
		}

	}


	function checkRowForFour() {
		for (i = 0; i < 60; i ++) {
		  let rowOfFour = [i, i+1, i+2, i+3]
		  let decidedColor = squares[i].style.backgroundImage
		  const isBlank = squares[i].style.backgroundImage === ''
	
		  const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
		  if (notValid.includes(i)) continue
	
		  if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
			score += 4
			scoreDisplay.innerHTML = score
			rowOfFour.forEach(index => {
			squares[index].style.backgroundImage = ''
			})
		  }
		}
	  }
	
	  function checkColumnForFour() {
		for (i = 0; i < 39; i ++) {
		  let columnOfFour = [i, i+width, i+width*2, i+width*3]
		  let decidedColor = squares[i].style.backgroundImage
		  const isBlank = squares[i].style.backgroundImage === ''
	
		  if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
			score += 4
			scoreDisplay.innerHTML = score
			columnOfFour.forEach(index => {
			squares[index].style.backgroundImage = ''
			})
		  }
		}
	  }
	
	  function checkRowForThree() {
		for (i = 0; i < 61; i ++) {
		  let rowOfThree = [i, i+1, i+2]
		  let decidedColor = squares[i].style.backgroundImage
		  const isBlank = squares[i].style.backgroundImage === ''
	
		  const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
		  if (notValid.includes(i)) continue
	
		  if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
			score += 3
			scoreDisplay.innerHTML = score
			rowOfThree.forEach(index => {
			squares[index].style.backgroundImage = ''
			})
		  }
		}
	  }
	
	  function checkColumnForThree() {
		for (i = 0; i < 47; i ++) {
		  let columnOfThree = [i, i+width, i+width*2]
		  let decidedColor = squares[i].style.backgroundImage
		  const isBlank = squares[i].style.backgroundImage === ''
	
		  if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
			score += 3
			scoreDisplay.innerHTML = score
			columnOfThree.forEach(index => {
			squares[index].style.backgroundImage = ''
			})
		  }
		}
	  }


	checkColumnForFour()
	checkColumnForThree()
	checkRowForFour()
	checkRowForThree()
	moveIntoSquareBelow()
	


	  squares.forEach((square) => {
		  square.addEventListener('click', () => {
			if(selectedSquares.length === 0){
				square.classList.add('selected')
				selectedSquares.push(parseInt(square.id))
			} else {
				selectedSquares.push(parseInt(square.id))
				let validMoves = [
					selectedSquares[0],
					selectedSquares[0] -1,
					selectedSquares[0] -width,
					selectedSquares[0] +1,
					selectedSquares[0] +width
				]
				if(validMoves.includes(selectedSquares[1])){
					let curretScore = score
					
					let colorBeingReplaced = [squares[selectedSquares[0]].style.backgroundImage, squares[selectedSquares[1]].style.backgroundImage]
					squares[selectedSquares[0]].style.backgroundImage = colorBeingReplaced[1]
					squares[selectedSquares[1]].style.backgroundImage = colorBeingReplaced[0]
					checkColumnForFour()
					checkColumnForThree()
					checkRowForFour()
					checkRowForThree()
					if(curretScore != score){
						trueSound.play()
						moveIntoSquareBelow()
					} else {
						falseSound.play()
						squares[selectedSquares[0]].style.backgroundImage = colorBeingReplaced[0]
						squares[selectedSquares[1]].style.backgroundImage = colorBeingReplaced[1]
					}
				} else {
					falseSound.play()
					
				}
				squares[selectedSquares[0]].classList.remove('selected')
				selectedSquares = []
			}
			
		  })
	  })


	//   soundControl.addEventListener('click', () => {
	// 	  if(soundControl.checked){
	// 		  soundOn = true
	// 	  } else {
	// 		  soundOn = false
	// 	  }
	//   })

	  soundControl.forEach(e => {
		  e.addEventListener('click', () => {
			if(e.checked){
				soundOn = true
			} else {
				soundOn = false
			}
			soundControl.forEach(e => {
				e.checked = soundOn
			})
		  })
	  })

	  const btnSound = document.querySelectorAll('.btn-sound')
	  btnSound.forEach(e => {
		  e.addEventListener('click', () => {
			clickSound.play()
		  })
	  })


	playBtn.addEventListener('mouseup', () => {
		score = 0
		scoreDisplay.innerHTML = score
		mainScene.classList.add('hide')
		gameScene.classList.remove('hide')
	})

	pauseBtn.addEventListener('mouseup', () => {
		gameScene.classList.add('hide')
		optionsScene.classList.remove('hide')
	})

	resumeBtn.addEventListener('mouseup', () => {
		optionsScene.classList.add('hide')
		gameScene.classList.remove('hide')
	})

	resetBtn.addEventListener('mouseup', () => {
		score = 0
		scoreDisplay.innerHTML = score
		optionsScene.classList.add('hide')
		gameScene.classList.remove('hide')
	})

	homeBtn.addEventListener('mouseup', () => {
		optionsScene.classList.add('hide')
		mainScene.classList.remove('hide')
	})



})