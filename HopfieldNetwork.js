class HopfieldNetwork {
  constructor(size) {
    this._size = size
    this.clearAll()
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

  clearState() {
    this._state = new Array(this._size).fill(0)
  }

  clearThresholds() {
    this._thresholds = new Array(this._size).fill(0)
  }

  clearWeights() {
    this._weights = []

    for (let i = 0; i < this._size; i++) {
      this._weights[i] = new Array(this._size).fill(0)
    }
  }

  clearAll() {
    this.clearState()
    this.clearThresholds()
    this.clearWeights()
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
      this._thresholds[i] = Math.random() * 35

      for (let j = 0; j < this._size; j++) {
        if (i === j) {
          this._weights[i][j] = 0
        } else {
          this._weights[i][j] = Math.round(Math.random())
        }
      }
    }
  }

  initRandomSymmetrical() {
    for (let i = 0; i < this._size; i++) {
      this._state[i] = Math.round(Math.random())
      this._thresholds[i] = Math.round(Math.random() * 35)

      for (let j = 0; j < i; j++) {
        const random = Math.round(Math.random())
        this._weights[i][j] = random
        this._weights[j][i] = random
      }
    }
  }
}
