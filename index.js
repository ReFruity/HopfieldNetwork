window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  context.fillRect(25, 25, 100, 100)
  context.clearRect(45, 45, 60, 60)
  context.strokeRect(50, 50, 50, 50)
})

