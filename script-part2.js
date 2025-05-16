// Game Initialization
function initGame(gameType, container) {
  container.innerHTML = ""

  switch (gameType) {
    case "snake":
      initSnakeGame(container)
      break
    case "tetris":
      initTetrisGame(container)
      break
    case "minesweeper":
      initMinesweeperGame(container)
      break
  }
}

// Snake Game
function initSnakeGame(container) {
  // Create game elements
  const gameContainer = document.createElement("div")
  gameContainer.className = "snake-game-container"

  const scoreDisplay = document.createElement("div")
  scoreDisplay.className = "snake-game-score"
  scoreDisplay.textContent = "Score: 0"

  const canvas = document.createElement("canvas")
  canvas.className = "snake-game-canvas"
  canvas.width = 300
  canvas.height = 300

  const controls = document.createElement("div")
  controls.className = "snake-game-controls"

  const restartButton = document.createElement("button")
  restartButton.className = "snake-control-button"
  restartButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v6h6"></path><path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path></svg>'

  controls.appendChild(restartButton)
  gameContainer.appendChild(scoreDisplay)
  gameContainer.appendChild(canvas)
  gameContainer.appendChild(controls)
  container.appendChild(gameContainer)

  // Game variables
  const ctx = canvas.getContext("2d")
  const gridSize = 15
  const gridWidth = canvas.width / gridSize
  const gridHeight = canvas.height / gridSize

  let snake = [{ x: 10, y: 10 }]
  let food = { x: 5, y: 5 }
  let direction = "right"
  let nextDirection = "right"
  let score = 0
  let gameSpeed = 150
  let gameLoop
  let gameOver = false

  // Initialize game
  function startGame() {
    snake = [{ x: 10, y: 10 }]
    food = generateFood()
    direction = "right"
    nextDirection = "right"
    score = 0
    gameSpeed = 150
    gameOver = false
    scoreDisplay.textContent = `Score: ${score}`

    if (gameLoop) clearInterval(gameLoop)
    gameLoop = setInterval(updateGame, gameSpeed)
  }

  // Generate random food position
  function generateFood() {
    const x = Math.floor(Math.random() * gridWidth)
    const y = Math.floor(Math.random() * gridHeight)

    // Check if food is on snake
    for (const segment of snake) {
      if (segment.x === x && segment.y === y) {
        return generateFood()
      }
    }

    return { x, y }
  }

  // Update game state
  function updateGame() {
    if (gameOver) return

    // Update direction
    direction = nextDirection

    // Calculate new head position
    const head = { ...snake[0] }

    switch (direction) {
      case "up":
        head.y--
        break
      case "down":
        head.y++
        break
      case "left":
        head.x--
        break
      case "right":
        head.x++
        break
    }

    // Check for collisions
    if (
      head.x < 0 ||
      head.x >= gridWidth ||
      head.y < 0 ||
      head.y >= gridHeight ||
      snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      gameOver = true
      clearInterval(gameLoop)
      drawGame()
      return
    }

    // Add new head
    snake.unshift(head)

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
      // Increase score
      score += 10
      scoreDisplay.textContent = `Score: ${score}`

      // Generate new food
      food = generateFood()

      // Increase speed every 50 points
      if (score % 50 === 0) {
        clearInterval(gameLoop)
        gameSpeed = Math.max(50, gameSpeed - 10)
        gameLoop = setInterval(updateGame, gameSpeed)
      }
    } else {
      // Remove tail
      snake.pop()
    }

    // Draw game
    drawGame()
  }

  // Draw game
  function drawGame() {
    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--background")
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle =
        index === 0
          ? getComputedStyle(document.body).getPropertyValue("--primary")
          : getComputedStyle(document.body).getPropertyValue("--secondary")
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1)
    })

    // Draw food
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--accent")
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1)

    // Draw game over
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#fff"
      ctx.font = '20px "Orbitron", sans-serif'
      ctx.textAlign = "center"
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10)
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20)
    }
  }

  // Handle keyboard input
  function handleKeydown(e) {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "down") nextDirection = "up"
        break
      case "ArrowDown":
        if (direction !== "up") nextDirection = "down"
        break
      case "ArrowLeft":
        if (direction !== "right") nextDirection = "left"
        break
      case "ArrowRight":
        if (direction !== "left") nextDirection = "right"
        break
    }
  }

  // Event listeners
  window.addEventListener("keydown", handleKeydown)
  restartButton.addEventListener("click", startGame)

  // Start game
  startGame()
}

// Tetris Game
function initTetrisGame(container) {
  // Create game elements
  const gameContainer = document.createElement("div")
  gameContainer.className = "tetris-game-container"

  const gameInfo = document.createElement("div")
  gameInfo.className = "tetris-game-info"

  const scoreDisplay = document.createElement("div")
  scoreDisplay.className = "tetris-game-score"
  scoreDisplay.textContent = "Score: 0"

  const levelDisplay = document.createElement("div")
  levelDisplay.className = "tetris-game-level"
  levelDisplay.textContent = "Level: 1"

  const linesDisplay = document.createElement("div")
  linesDisplay.className = "tetris-game-lines"
  linesDisplay.textContent = "Lines: 0"

  gameInfo.appendChild(scoreDisplay)
  gameInfo.appendChild(levelDisplay)
  gameInfo.appendChild(linesDisplay)

  const canvas = document.createElement("canvas")
  canvas.className = "tetris-game-canvas"
  canvas.width = 240
  canvas.height = 400

  const controls = document.createElement("div")
  controls.className = "tetris-game-controls"

  const startButton = document.createElement("button")
  startButton.className = "tetris-control-button"
  startButton.textContent = "Start"

  const pauseButton = document.createElement("button")
  pauseButton.className = "tetris-control-button"
  pauseButton.textContent = "Pause"

  controls.appendChild(startButton)
  controls.appendChild(pauseButton)

  gameContainer.appendChild(gameInfo)
  gameContainer.appendChild(canvas)
  gameContainer.appendChild(controls)
  container.appendChild(gameContainer)

  // Simplified Tetris game implementation
  const ctx = canvas.getContext("2d")
  const blockSize = 20
  const boardWidth = canvas.width / blockSize
  const boardHeight = canvas.height / blockSize
  let board = Array(boardHeight)
    .fill()
    .map(() => Array(boardWidth).fill(0))
  let score = 0
  let level = 1
  let lines = 0
  let gameInterval
  let isPaused = false
  let isGameOver = false

  // Tetromino shapes
  const shapes = [
    [[1, 1, 1, 1]], // I
    [
      [1, 1, 1],
      [0, 1, 0],
    ], // T
    [
      [1, 1, 1],
      [1, 0, 0],
    ], // L
    [
      [1, 1, 1],
      [0, 0, 1],
    ], // J
    [
      [1, 1],
      [1, 1],
    ], // O
    [
      [0, 1, 1],
      [1, 1, 0],
    ], // S
    [
      [1, 1, 0],
      [0, 1, 1],
    ], // Z
  ]

  // Colors for tetrominoes
  const colors = [
    "#00f0f0", // I - Cyan
    "#a000f0", // T - Purple
    "#f0a000", // L - Orange
    "#0000f0", // J - Blue
    "#f0f000", // O - Yellow
    "#00f000", // S - Green
    "#f00000", // Z - Red
  ]

  let currentShape
  let currentColor
  let currentX
  let currentY

  // Initialize game
  function initGame() {
    board = Array(boardHeight)
      .fill()
      .map(() => Array(boardWidth).fill(0))
    score = 0
    level = 1
    lines = 0
    isGameOver = false

    scoreDisplay.textContent = `Score: ${score}`
    levelDisplay.textContent = `Level: ${level}`
    linesDisplay.textContent = `Lines: ${lines}`

    createNewPiece()
    drawBoard()
  }

  // Create new tetromino piece
  function createNewPiece() {
    const randomIndex = Math.floor(Math.random() * shapes.length)
    currentShape = shapes[randomIndex]
    currentColor = colors[randomIndex]
    currentX = Math.floor((boardWidth - currentShape[0].length) / 2)
    currentY = 0

    // Check if game over
    if (!isValidMove(0, 0)) {
      isGameOver = true
      clearInterval(gameInterval)
      drawGameOver()
    }
  }

  // Check if move is valid
  function isValidMove(offsetX, offsetY, newShape = currentShape) {
    for (let y = 0; y < newShape.length; y++) {
      for (let x = 0; x < newShape[y].length; x++) {
        if (newShape[y][x]) {
          const newX = currentX + x + offsetX
          const newY = currentY + y + offsetY

          if (newX < 0 || newX >= boardWidth || newY < 0 || newY >= boardHeight || (newY >= 0 && board[newY][newX])) {
            return false
          }
        }
      }
    }
    return true
  }

  // Rotate piece
  function rotatePiece() {
    const newShape = []
    for (let x = 0; x < currentShape[0].length; x++) {
      const newRow = []
      for (let y = currentShape.length - 1; y >= 0; y--) {
        newRow.push(currentShape[y][x])
      }
      newShape.push(newRow)
    }

    if (isValidMove(0, 0, newShape)) {
      currentShape = newShape
    }
  }

  // Move piece down
  function moveDown() {
    if (isValidMove(0, 1)) {
      currentY++
    } else {
      lockPiece()
      clearLines()
      createNewPiece()
    }
  }

  // Lock piece in place
  function lockPiece() {
    for (let y = 0; y < currentShape.length; y++) {
      for (let x = 0; x < currentShape[y].length; x++) {
        if (currentShape[y][x]) {
          board[currentY + y][currentX + x] = currentColor
        }
      }
    }
  }

  // Clear completed lines
  function clearLines() {
    let linesCleared = 0

    for (let y = 0; y < boardHeight; y++) {
      if (board[y].every((cell) => cell !== 0)) {
        // Remove the line
        board.splice(y, 1)
        // Add a new empty line at the top
        board.unshift(Array(boardWidth).fill(0))
        linesCleared++
      }
    }

    if (linesCleared > 0) {
      // Update score and level
      lines += linesCleared
      score += linesCleared * 100 * level
      level = Math.floor(lines / 10) + 1

      // Update displays
      scoreDisplay.textContent = `Score: ${score}`
      levelDisplay.textContent = `Level: ${level}`
      linesDisplay.textContent = `Lines: ${lines}`

      // Adjust game speed
      clearInterval(gameInterval)
      const speed = Math.max(100, 500 - (level - 1) * 50)
      gameInterval = setInterval(() => {
        if (!isPaused && !isGameOver) {
          moveDown()
          drawBoard()
        }
      }, speed)
    }
  }

  // Draw the game board
  function drawBoard() {
    // Clear canvas
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--background")
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw the board
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        if (board[y][x]) {
          ctx.fillStyle = board[y][x]
          ctx.fillRect(x * blockSize, y * blockSize, blockSize - 1, blockSize - 1)
        }
      }
    }

    // Draw current piece
    if (!isGameOver) {
      ctx.fillStyle = currentColor
      for (let y = 0; y < currentShape.length; y++) {
        for (let x = 0; x < currentShape[y].length; x++) {
          if (currentShape[y][x]) {
            ctx.fillRect((currentX + x) * blockSize, (currentY + y) * blockSize, blockSize - 1, blockSize - 1)
          }
        }
      }
    }

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 0.5

    for (let y = 0; y <= boardHeight; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * blockSize)
      ctx.lineTo(canvas.width, y * blockSize)
      ctx.stroke()
    }

    for (let x = 0; x <= boardWidth; x++) {
      ctx.beginPath()
      ctx.moveTo(x * blockSize, 0)
      ctx.lineTo(x * blockSize, canvas.height)
      ctx.stroke()
    }
  }

  // Draw game over screen
  function drawGameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#fff"
    ctx.font = '20px "Orbitron", sans-serif'
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30)
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2)
    ctx.fillText(`Level: ${level}`, canvas.width / 2, canvas.height / 2 + 30)
  }

  // Handle keyboard input
  function handleKeydown(e) {
    if (isPaused || isGameOver) return

    switch (e.key) {
      case "ArrowLeft":
        if (isValidMove(-1, 0)) {
          currentX--
          drawBoard()
        }
        break
      case "ArrowRight":
        if (isValidMove(1, 0)) {
          currentX++
          drawBoard()
        }
        break
      case "ArrowDown":
        if (isValidMove(0, 1)) {
          currentY++
          drawBoard()
        }
        break
      case "ArrowUp":
        rotatePiece()
        drawBoard()
        break
      case " ":
        // Hard drop
        while (isValidMove(0, 1)) {
          currentY++
        }
        moveDown()
        drawBoard()
        break
    }
  }

  // Event listeners
  window.addEventListener("keydown", handleKeydown)

  startButton.addEventListener("click", () => {
    if (isGameOver) {
      initGame()
    }

    if (!gameInterval) {
      gameInterval = setInterval(() => {
        if (!isPaused && !isGameOver) {
          moveDown()
          drawBoard()
        }
      }, 500)
    }
  })

  pauseButton.addEventListener("click", () => {
    isPaused = !isPaused
    pauseButton.textContent = isPaused ? "Resume" : "Pause"
  })

  // Initialize game
  initGame()
}

// Minesweeper Game
function initMinesweeperGame(container) {
  // Create game elements
  const gameContainer = document.createElement("div")
  gameContainer.className = "minesweeper-game-container"

  const gameInfo = document.createElement("div")
  gameInfo.className = "minesweeper-game-info"

  const minesDisplay = document.createElement("div")
  minesDisplay.className = "minesweeper-game-mines"
  minesDisplay.textContent = "Mines: 10"

  const flagsDisplay = document.createElement("div")
  flagsDisplay.className = "minesweeper-game-flags"
  flagsDisplay.textContent = "Flags: 0"

  gameInfo.appendChild(minesDisplay)
  gameInfo.appendChild(flagsDisplay)

  const board = document.createElement("div")
  board.className = "minesweeper-game-board"

  const controls = document.createElement("div")
  controls.className = "minesweeper-game-controls"

  const newGameButton = document.createElement("button")
  newGameButton.className = "minesweeper-control-button"
  newGameButton.textContent = "New Game"

  controls.appendChild(newGameButton)

  gameContainer.appendChild(gameInfo)
  gameContainer.appendChild(board)
  gameContainer.appendChild(controls)
  container.appendChild(gameContainer)

  // Game variables
  const boardSize = 10
  const totalMines = 10
  let mineLocations = []
  let flaggedCells = []
  let revealedCells = []
  let isGameOver = false

  // Initialize game
  function initGame() {
    // Clear board
    board.innerHTML = ""
    mineLocations = []
    flaggedCells = []
    revealedCells = []
    isGameOver = false

    // Update displays
    minesDisplay.textContent = `Mines: ${totalMines}`
    flagsDisplay.textContent = `Flags: 0`

    // Generate mines
    while (mineLocations.length < totalMines) {
      const x = Math.floor(Math.random() * boardSize)
      const y = Math.floor(Math.random() * boardSize)
      const index = y * boardSize + x

      if (!mineLocations.includes(index)) {
        mineLocations.push(index)
      }
    }

    // Create cells
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const cell = document.createElement("div")
        cell.className = "minesweeper-cell"
        cell.dataset.x = x
        cell.dataset.y = y
        cell.dataset.index = y * boardSize + x

        // Left click to reveal
        cell.addEventListener("click", function () {
          if (isGameOver || flaggedCells.includes(Number.parseInt(this.dataset.index))) return

          revealCell(Number.parseInt(this.dataset.x), Number.parseInt(this.dataset.y))
          checkWinCondition()
        })

        // Right click to flag
        cell.addEventListener("contextmenu", function (e) {
          e.preventDefault()

          if (isGameOver || revealedCells.includes(Number.parseInt(this.dataset.index))) return

          const index = Number.parseInt(this.dataset.index)

          if (flaggedCells.includes(index)) {
            // Remove flag
            flaggedCells = flaggedCells.filter((i) => i !== index)
            this.classList.remove("flagged")
            this.textContent = ""
          } else {
            // Add flag
            flaggedCells.push(index)
            this.classList.add("flagged")
            this.textContent = "🚩"
          }

          flagsDisplay.textContent = `Flags: ${flaggedCells.length}`
          checkWinCondition()
        })

        board.appendChild(cell)
      }
    }
  }

  // Count adjacent mines
  function countAdjacentMines(x, y) {
    let count = 0

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue

        const nx = x + dx
        const ny = y + dy

        if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
          const index = ny * boardSize + nx
          if (mineLocations.includes(index)) {
            count++
          }
        }
      }
    }

    return count
  }

  // Reveal cell
  function revealCell(x, y) {
    const index = y * boardSize + x

    // Already revealed
    if (revealedCells.includes(index)) return

    // Add to revealed cells
    revealedCells.push(index)

    // Get cell element
    const cell = board.children[index]
    cell.classList.add("revealed")

    // Check if mine
    if (mineLocations.includes(index)) {
      cell.classList.add("mine")
      cell.textContent = "💣"
      gameOver(false)
      return
    }

    // Count adjacent mines
    const adjacentMines = countAdjacentMines(x, y)

    if (adjacentMines > 0) {
      cell.textContent = adjacentMines

      // Set color based on number
      const colors = ["blue", "green", "red", "purple", "maroon", "turquoise", "black", "gray"]
      cell.style.color = colors[adjacentMines - 1]
    } else {
      // Reveal adjacent cells if no mines
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue

          const nx = x + dx
          const ny = y + dy

          if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
            revealCell(nx, ny)
          }
        }
      }
    }
  }

  // Check win condition
  function checkWinCondition() {
    // Win if all non-mine cells are revealed
    if (revealedCells.length + mineLocations.length === boardSize * boardSize) {
      // Check if all mines are flagged correctly
      const correctFlags = mineLocations.every((index) => flaggedCells.includes(index))

      if (correctFlags) {
        gameOver(true)
      }
    }
  }

  // Game over
  function gameOver(isWin) {
    isGameOver = true

    // Reveal all mines
    mineLocations.forEach((index) => {
      const cell = board.children[index]

      if (!flaggedCells.includes(index)) {
        cell.classList.add("revealed")
        cell.classList.add("mine")
        cell.textContent = "💣"
      }
    })

    // Show win/lose message
    const message = document.createElement("div")
    message.style.position = "absolute"
    message.style.top = "50%"
    message.style.left = "50%"
    message.style.transform = "translate(-50%, -50%)"
    message.style.backgroundColor = isWin ? "rgba(0, 200, 0, 0.8)" : "rgba(200, 0, 0, 0.8)"
    message.style.color = "white"
    message.style.padding = "10px 20px"
    message.style.borderRadius = "5px"
    message.style.fontFamily = "var(--font-heading)"
    message.style.zIndex = "10"
    message.textContent = isWin ? "YOU WIN!" : "GAME OVER"

    board.style.position = "relative"
    board.appendChild(message)
  }

  // Event listeners
  newGameButton.addEventListener("click", initGame)

  // Initialize game
  initGame()
}
