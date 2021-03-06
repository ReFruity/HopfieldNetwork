const Board = (() => {
  let boardSize, cellSize, canvasSize, canvas, context, network

  window.addEventListener('load', () => {
    const randomSeed = parseInt(Math.random() * 1e10)
    const randomSeedInput = document.getElementById('randomSeed')
    randomSeedInput.value = randomSeed

    apply()

    canvas.addEventListener('click', (event) => {
      const x = parseInt(event.offsetX / cellSize)
      const y = parseInt(event.offsetY / cellSize)
      const cell = y * boardSize + x
      const value = network.getCell(cell)
      
      if (value === 1) {
        network.clearCell(cell)
      } else {
        network.setCell(cell)
      }

      clear(canvas)
      drawNetwork(context, boardSize, cellSize, network)
    })
  })

  function paintBlack(context, cellSize, x, y) {
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }

  function clear(canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawNetwork(context, boardSize, cellSize, network) {
    for (let i = 0; i < network.getSize(); i++) {
      if (network.getCell(i) === 1) {
        paintBlack(context, cellSize, i % boardSize, parseInt(i / boardSize))
      }
    }
  }

  function iterate() {
    clear(canvas)
    network.iterate()
    drawNetwork(context, boardSize, cellSize, network)
    console.log(network)
    console.log(network.getEnergy())
  }

  function apply() {
    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d')

    const boardSizeInput = document.getElementById('boardSize')
    const cellSizeInput = document.getElementById('cellSize')
    const randomSeedInput = document.getElementById('randomSeed')

    Math.seedrandom(randomSeedInput.value)
    console.log(`Random seed: ${randomSeedInput.value}`)

    boardSize = boardSizeInput.value
    cellSize = cellSizeInput.value
    canvasSize = boardSize * cellSize
    canvas.width = canvasSize
    canvas.height = canvasSize
    network = new HopfieldNetwork(boardSize * boardSize)
    network.initRandomSymmetrical()
    network.clearState()

    network.setCell(0)
    network.setCell(1)
    network.setCell(2)
    network.setCell(3)

    drawNetwork(context, boardSize, cellSize, network)
  }

  function populateHNNInputs() {
    const thresholds = document.getElementById('thresholds')
    const weights = document.getElementById('weights')

    while(thresholds.firstChild) {
      thresholds.removeChild(thresholds.firstChild)
    }

    while(weights.firstChild) {
      weights.removeChild(weights.firstChild)
    }

    if (network.getSize() > 25) {
      const alert = document.createElement('span')
      alert.innerText = 'Threshold and weight editing allowed only for networks with size less or equal 25'
      weights.append(alert)
      return
    }

    for (let i = 0; i < network.getSize(); i++) {
      const thresholdInput = document.createElement('input')
      thresholdInput.id = `threshold-${i}`
      thresholdInput.type = 'number'
      thresholdInput.value = network.getThreshold(i)
      thresholds.append(thresholdInput)

      const weightRow = document.createElement('div')

      for (let j = 0; j < network.getSize(); j++) {
        const weightInput = document.createElement('input')
        weightInput.id = `weight-${i}-${j}`
        weightInput.type = 'number'
        weightInput.value = network.getWeight(i, j)
        weightRow.append(weightInput)
      }

      weights.append(weightRow)
    }
  }

  function saveHNN() {
    for (let i = 0; i < network.getSize(); i++) {
      const thresholdInput = document.getElementById(`threshold-${i}`)
      network.setThreshold(i, thresholdInput.value)

      for (let j = 0; j < network.getSize(); j++) {
        const weightInput = document.getElementById(`weight-${i}-${j}`)
        network.setWeight(i, j, weightInput.value)
      }
    }
  }

  function clearHNN() {
    network.clearAll()
    populateHNNInputs()
  }

  function exportHNN() {
    const JSONTextarea = document.getElementById('JSONTextarea')
    JSONTextarea.value = JSON.stringify(network.exportJSON(), null, 2)
  }

  function importHNN() {
    const JSONTextarea = document.getElementById('JSONTextarea')
    network.importJSON(JSON.parse(JSONTextarea.value))
    console.log(network)
    populateHNNInputs()
    clear(canvas)
    drawNetwork(context, boardSize, cellSize, network)
  }

  return {
    iterate,
    apply,
    populateHNNInputs,
    saveHNN,
    clearHNN,
    exportHNN,
    importHNN
  }
})()