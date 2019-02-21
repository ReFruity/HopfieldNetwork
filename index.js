const canvasSize = 900
const boardSize = 10
const cellSize = canvasSize / boardSize
let context
let canvas
let network

class HopfieldNetwork {
  constructor(size) {
    this._size = size
    this._thresholds = new Array(this._size).fill(0)
    this._state = new Array(this._size).fill(0)
    this._weights = []

    for (let i = 0; i < this._size; i++) {
      this._weights[i] = new Array(this._size).fill(0)
    }
  }

  setThreshold(x, threshold) {
    this._thresholds[x] = threshold
  }

  getThreshold(x) {
    return this._thresholds[x]
  }

  setCell(x) {
    this._state[x] = 1
  }

  clearCell(x) {
    this._state[x] = 0
  }

  getCell(x) {
    return this._state[x]
  }


  setWeight(x, y, weight) {
    this._weights[x][y] = weight
  }

  getWeight(x, y) {
    return this._weights[x][y]
  }

  getSize() {
    return this._size
  }

  iterate() {
    const newState = []

    for (let i = 0; i < this._size; i++) {
      let sum = 0, cell

      for (let j = 0; j < this._size; j++) {
        sum += this._weights[i][j] * this._state[j]
      }

      if (sum > this._thresholds[i]) {
        cell = 1
      } else {
        cell = 0
      }

      newState.push(cell)
    }

    this._state = newState
  }

  initRandom() {
    for (let i = 0; i < this._size; i++) {
      this._state[i] = Math.round(Math.random())
      this._thresholds[i] = Math.round(Math.random()) * 20

      for (let j = 0; j < this._size; j++) {
        this._weights[i][j] = Math.round(Math.random())
      }
    }
  }
}

window.addEventListener('load', () => {
  canvas = document.getElementById('canvas')
  canvas.width = canvasSize
  canvas.height = canvasSize
  context = canvas.getContext('2d')
  network = new HopfieldNetwork(boardSize * boardSize)

  network.initRandom()

  console.log(network)

  // network.setCell(0)
  // network.setCell(1)
  // network.setCell(9)
  // network.setCell(11)
  // network.setCell(20)
  // network.setCell(99)
  // network.setCell(98)

  drawNetwork(network)

  // paintBlack(0, 0)
  // paintBlack(1, 2)
  // paintBlack(2, 2)
  // paintBlack(9, 9)
})

function iterate() {
  clear(canvas)
  network.iterate()
  drawNetwork(network)
  console.log(network)
}

function paintBlack(x, y) {
  context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
}

function clear(canvas) {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

function drawNetwork(network) {
  for (let i = 0; i < network.getSize(); i++) {
    if (network.getCell(i) === 1) {
      paintBlack(parseInt(i / boardSize), i % boardSize)
    }
  }
}
