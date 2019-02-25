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

  getEnergy() {
    let sum1 = 0, sum2 = 0

    for (let i = 0; i < this._size; i++) {
      const cell1 = this._state[i] === 1 ? 1 : -1

      for (let j = 0; j < this._size; j++) {
        const cell2 = this._state[j] === 1 ? 1 : -1
        sum1 += this._weights[i][j] * cell1 * cell2
      }

      sum2 = this._thresholds[i] * cell1
    }

    return -1/2 * sum1 + sum2
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

  exportJSON() {
    return {
      size: this._size,
      state: this._state,
      thresholds: this._thresholds,
      weights: this._weights
    }
  }

  importJSON(json) {
    this._size = json.size
    this._thresholds = json.thresholds
    this._state = json.state
    this._weights = json.weights
  }
}
