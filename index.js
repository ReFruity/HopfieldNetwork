const Board = (() => {
  const canvasSize = 900
  const boardSize = 10
  const cellSize = canvasSize / boardSize
  let canvas
  let context
  let network

  window.addEventListener('load', () => {
    canvas = document.getElementById('canvas')
    canvas.width = canvasSize
    canvas.height = canvasSize
    context = canvas.getContext('2d')
    network = new HopfieldNetwork(boardSize * boardSize)
    canvas.addEventListener('click', (event) => { console.log(event) })

    // network.initRandom()
    network.initRandomSymmetrical()
    network.clearState()

    network.setCell(0)
    network.setCell(1)
    network.setCell(9)
    network.setCell(11)

    console.log(network)

    drawNetwork(context, boardSize, cellSize, network)

    // paintBlack(0, 0)
    // paintBlack(1, 2)
    // paintBlack(2, 2)
    // paintBlack(9, 9)
  })

  function iterate() {
    clear(canvas)
    network.iterate()
    drawNetwork(context, boardSize, cellSize, network)
    console.log(network)
  }

  function paintBlack(context, cellSize, x, y) {
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }

  function clear(canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawNetwork(context, boardSize, cellSize, network) {
    for (let i = 0; i < network.getSize(); i++) {
      if (network.getCell(i) === 1) {
        paintBlack(context, cellSize, parseInt(i / boardSize), i % boardSize)
      }
    }
  }

  return {
    iterate
  }
})()