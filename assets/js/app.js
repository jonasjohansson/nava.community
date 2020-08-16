window.addEventListener('load', () => {
    document.body.classList.remove('loading')
})

document.addEventListener('DOMContentLoaded', () => {
    let oldX = 0
    let oldY = 0
    let thresh = 50
    document.addEventListener('mousemove', e => {
        let diffX = Math.abs(e.clientX - oldX)
        let diffY = Math.abs(e.clientY - oldY)
        let diff = diffX + diffY
        if (diff > thresh) {
            // document.documentElement.classList.toggle('invert')
            oldX = e.clientX
            oldY = e.clientY
        }
    })
})
